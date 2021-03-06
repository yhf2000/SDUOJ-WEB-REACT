import React, {Component} from "react";
import {Card, Space} from "antd";
import MApi from "../../Utils/API/m-api";
import mApi from "../../Utils/API/m-api";
import TableWithPagination from "../../Component/common/Table/TableWithPagination";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import ModalFormUseForm from "../../Component/common/Form/ModalFormUseForm";
import ItemTitle from "../../Component/common/Form/Item/ItemTitle";
import ItemSwitch from "../../Component/common/Form/Item/ItemSwitch";
import ItemSelectGroup from "../../Component/group/Form/Item/ItemSelectGroup";
import ItemText from "../../Component/common/Form/Item/ItemText";
import FormJudgeType from "../../Component/problem/From/FormJudgeType";
import ProDescriptions from "../../Component/problem/ProDescriptions";
import ProCheckPoints from "../../Component/problem/ProCheckPoints";

class MProblem extends Component<any, any> {
    render() {

        const beforeSubmit = (value: any) => {
            value.isPublic = (value.isPublic ? 1 : 0)
            if (value.functionTemplates === undefined) value.functionTemplates = {}
            const functionTemplates = []
            for (const x in value.functionTemplates) {
                functionTemplates.push({
                    ...value.functionTemplates[x],
                    isShowFunctionTemplate: value.functionTemplates[x].isShowFunctionTemplate ? 1 : 0
                })
            }
            value.functionTemplates = functionTemplates

            return value
        }
        const beforeUse = (value: any) => {
            if (value.managerGroups === null) value.managerGroups = []
            if (value.judgeTemplates === null) value.judgeTemplates = []
            if (value.functionTemplates !== undefined) {
                const functionTemplates: any = {}
                for (const x of value.functionTemplates) functionTemplates[x.judgeTemplateId] = {...x}
                value.functionTemplates = functionTemplates
            }
            return value
        }

        const ProblemForm = [
            {
                component: (
                    <>
                        <ItemTitle name={"problemTitle"} label={"????????????"}/>
                        <ItemSwitch name={"isPublic"} label={"??????"}/>
                        <ItemText name={"source"} label={"??????"} required={false}/>
                        <ItemSelectGroup name={"managerGroups"} label={"?????????"}
                                         mode={"multiple"} formName={"ProblemInfo"}/>
                    </>
                ),
                label: "????????????"
            },
            {
                component: (
                    <>
                        <ItemText name={"timeLimit"} label={"????????????"} addonAfter={"ms"}
                                  initialValue={1000}/>
                        <ItemText name={"memoryLimit"} label={"????????????"} addonAfter={"KB"}
                                  initialValue={256 * 1024}/>
                        <ItemText name={"outputLimit"} label={"????????????"} addonAfter={"KB"}
                                  initialValue={100 * 1024}/>
                    </>
                ),
                label: "????????????"
            },
            {
                component: <FormJudgeType/>,
                label: "????????????"
            },
        ]

        let colData: any[] = [
            {
                title: "ID",
                dataIndex: "problemId",
                width: 50,
                responsive: ["lg", "sm"]
            },
            {
                title: "??????",
                dataIndex: "problemCode",
                width: "auto",
                responsive: ["lg", "sm", "xs"]
            },
            {
                title: "??????",
                dataIndex: "problemTitle",
                width: "auto",
                responsive: ["lg", "sm", "xs"],
            },
            {
                title: "????????????",
                dataIndex: "timeLimit",
                width: "auto",
                responsive: ["lg", "sm"],
                render: (text: string) => {
                    return <>{Math.floor(parseInt(text) / 1000)}s ({text}ms)</>
                }
            },
            {
                title: "????????????",
                dataIndex: "memoryLimit",
                width: "auto",
                responsive: ["lg", "sm"],
                render: (text: string) => {
                    return <>{Math.floor(parseInt(text) / 1024)}MB ({text}KB)</>
                }
            },
            {
                title: "AC/??????",
                width: "auto",
                responsive: ["lg"],
                render: (text: string, row: any) => {
                    return <>{row.acceptNum} / {row.submitNum}</>
                }
            },
            {
                title: "??????",
                dataIndex: "source",
                width: "auto",
                responsive: ["lg"],
            },
            {
                title: "??????",
                dataIndex: "username",
                width: "auto",
                responsive: ["lg"],
            },
            {
                title: this.props.t("operator"),
                width: "auto",
                responsive: ["lg", "sm"],
                render: (text: any, rows: any) => {
                    return (
                        <Space size={3}>
                            <ModalFormUseForm
                                TableName={"ProblemList"}
                                width={600}
                                title={rows.problemCode}
                                type={"update"}
                                formName={"ProblemInfo"}
                                subForm={ProblemForm}
                                updateAppendProps={{problemCode: rows.problemCode}}
                                dataSubmitter={(value: any) => {
                                    value = beforeSubmit(value)
                                    return mApi.updateProblemInfo(value)
                                }}
                                dataLoader={async () => {
                                    return mApi.getProblem({problemCode: rows.problemCode}).then((value: any) => {
                                        value = beforeUse(value)
                                        return Promise.resolve(value)
                                    })
                                }}
                            />
                            <ModalFormUseForm
                                TableName={"ProblemList"}
                                width={600}
                                title={"????????????(?????????" + rows.problemCode + ")"}
                                type={"fork"}
                                formName={"ProblemInfo"}
                                subForm={ProblemForm}
                                dataSubmitter={(value: any) => {
                                    value = beforeSubmit(value)
                                    return mApi.createProblem(value)
                                }}
                                dataLoader={async () => {
                                    return mApi.getProblem({problemCode: rows.problemCode}).then((value: any) => {
                                        value = beforeUse(value)
                                        return Promise.resolve(value)
                                    })
                                }}
                            />
                            <ProDescriptions
                                problemCode={rows.problemCode}
                                title={rows.problemTitle}
                                defaultDescriptionId={rows.defaultDescriptionId}
                            />
                            <ProCheckPoints
                                problemCode={rows.problemCode}
                                title={rows.problemTitle}
                            />
                        </Space>
                    )
                }
            }
        ]


        return (
            <div style={{marginTop: -20, overflow: "hidden"}}>
                <Card size={"small"} bordered={false} title={"????????????"} extra={
                    <>
                        <ModalFormUseForm
                            TableName={"ProblemList"}
                            width={600}
                            title={"????????????"}
                            type={"create"}
                            subForm={ProblemForm}
                            dataSubmitter={(value: any) => {
                                value = beforeSubmit(value)
                                return mApi.createProblem(value)
                            }}
                        />
                    </>
                }
                >
                    <TableWithPagination
                        search={true}
                        columns={colData}
                        API={MApi.getProblemList}
                        size={"small"}
                        name={"ProblemList"}
                        rowKey={"problemId"}
                    />
                </Card>
            </div>
        )
    }
}

export default withTranslation()(withRouter(MProblem))