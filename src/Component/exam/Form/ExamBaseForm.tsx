import React, {Dispatch, useEffect, useState} from "react";
import {Col, Form, List, Row, Input, DatePicker, FormInstance, Select, Skeleton} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons"
import {withTranslation} from "react-i18next";
import Meta from "antd/lib/card/Meta";
import TextArea from "antd/lib/input/TextArea";
import {connect} from "react-redux";
import {examBasicType, ManageState} from "../../../Type/IManage";
import {withRouter} from "react-router";
import moment from "moment";
import {TimeDiff} from "../../../Utils/Time";

const {RangePicker} = DatePicker;

const ExamBaseForm = (props: any) => {
    // 页面表单的操作引用
    const formRef: React.RefObject<FormInstance<any>> = props.getRef();

    // === State ===
    // 考试描述
    const [examDescription, setExamDescription] = useState<string[]>([]);
    const [examTime, setExamTime] = useState<moment.Moment[]>();

    useEffect(()=>{
        if (props.initData != undefined) {
            if (props.initData.examDescription != undefined)
                setExamDescription(
                    props.initData.examDescription.split('\n').filter((value: string) => value != "")
                )
            if (props.initData.examStartEndTime != undefined)
                setExamTime(props.initData.examStartEndTime)
        }
    }, [props.initData])

    return (
        <>
            <Skeleton active loading={!props.isDataLoad}>
                <Form
                    initialValues={props.initData}
                    layout={"vertical"}
                    ref={formRef}
                    onValuesChange={(changedValues: any, values: examBasicType) => {
                        if (changedValues.examDescription !== undefined) {
                            setExamDescription(
                                changedValues.examDescription.split('\n').filter((value: string) => value != "")
                            )
                        }
                        if (changedValues.examStartEndTime !== undefined) {
                            setExamTime(changedValues.examStartEndTime)
                        }
                    }}
                >
                    <Form.Item
                        name="examTitle"
                        label="标题"
                        rules={[{required: true}]}
                    >
                        <Input placeholder="请输入考试标题"/>
                    </Form.Item>
                    <Row>
                        <Col span={11}>
                            <Form.Item
                                name="examStartEndTime"
                                label="考试起止时间"
                                rules={[{type: 'array' as const, required: true}]}
                            >
                                <RangePicker showTime={{minuteStep: 5, secondStep: 30}} format={"YYYY-MM-DD HH:mm:ss"}/>
                            </Form.Item>
                        </Col>
                        <Col span={11} offset={1}>
                            <Meta title={"考试时长"} description={
                                [''].map(() => {
                                    if (examTime?.length == 2) {
                                        return TimeDiff(examTime[0].unix() * 1000, examTime[1].unix() * 1000)
                                    }
                                })
                            } className={"exam-form-preview"}/>
                        </Col>

                    </Row>

                    <Row>
                        <Col span={11}>
                            <Form.Item
                                name="examDescription"
                                label="描述"
                                rules={[{required: true}]}
                                tooltip={{title: '每一行会生成为一项', icon: <InfoCircleOutlined/>}}
                            >
                                <TextArea rows={4} placeholder="请输入考试描述"/>
                            </Form.Item>
                        </Col>
                        <Col span={11} offset={1}>
                            {
                                [''].map(() => {
                                    if (!(examDescription.length == 0 || (examDescription.length == 1 && examDescription[0].length == 0))) {
                                        return (
                                            <Meta title={"预览"} description={
                                                <List
                                                    size="small"
                                                    dataSource={examDescription}
                                                    renderItem={
                                                        (item: string, index) => {
                                                            return (
                                                                <List.Item>{index + 1}. <span>{item}</span></List.Item>
                                                            )
                                                        }
                                                    }
                                                />
                                            } className={"exam-form-preview"}/>
                                        )
                                    }
                                })
                            }
                        </Col>
                    </Row>
                </Form>
            </Skeleton>
        </>
    )
}

const mapStateToProps = (state: any) => {
    const State: ManageState = state.ManageReducer
    return {
        examBasicInfo: State.examData.examBasicInfo
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(withRouter(ExamBaseForm)))