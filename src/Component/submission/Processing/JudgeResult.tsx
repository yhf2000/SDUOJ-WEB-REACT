import {Component} from "react";
import {Card, Col, Progress, Row, Space, Tabs} from "antd";
import {WithTranslation, withTranslation} from "react-i18next";
import TestCase, {TestCaseProp} from "../TestCase";
import {displayType, StateList, TestCaseStates} from "../../../Type/ISubmission";


interface IJudgeResult extends WithTranslation {
    data: TestCaseProp[]
    sumScore: number
    scoreMod: displayType
}

class JudgeResult extends Component<IJudgeResult, any> {


    render() {

        const getInfo = () => {
            const {data} = this.props
            let numList = Array(StateList.length)
            let scoreAC = 0, ACNumber = 0
            for (let i = 0; i < StateList.length; i++) numList[i] = []
            for (let i = 0; i < data.length; i++) {
                // @ts-ignore
                const add: number = data[i].caseScore === undefined ? 0 : data[i].caseScore
                numList[data[i].caseType].push(data[i])
                scoreAC += add
                ACNumber += (data[i].caseType === TestCaseStates.Accepted) ? 1 : 0
            }
            return {
                numList: numList, AC: scoreAC, SumAll: this.props.sumScore,
                ACNumber: ACNumber, CaseNumber: data.length
            }
        }
        const info = getInfo()

        return (
            <Card
                size="small"
                title={<span style={{fontWeight: "bold"}}>评测数据集</span>}
                className={"card"}
            >
                <Row>
                    <Col span={18}>
                        <Tabs defaultActiveKey="0" tabPosition={"left"} className={"JudgeResult-tab"}>
                            {info.numList.map((value, index) => {
                                if (value.length !== 0) {
                                    return (
                                        <Tabs.TabPane
                                            tab={(
                                                <Space>
                                                    <TestCase type={"tag-simple"} caseType={index}/>
                                                    <span> x {value.length}</span>
                                                </Space>
                                            )}
                                            key={index}
                                        >
                                            {
                                                value.length !== 0 && (
                                                    <Card
                                                        size={"small"}
                                                        title={<TestCase type={"text"} caseType={index}/>}
                                                    >
                                                        {value.map((val: any) => {
                                                            return <TestCase type={"index"} {...val}/>
                                                        })}
                                                    </Card>
                                                )
                                            }
                                        </Tabs.TabPane>
                                    )
                                }
                            })}
                        </Tabs>
                    </Col>
                    <Col span={6} className={"Progress-set"}>
                        {this.props.scoreMod === "show" && (
                            <>
                                <Progress
                                    success={{percent: info.AC / info.SumAll * 100}}
                                    type="dashboard"
                                    format={() => `${info.AC} / ${info.SumAll}`}
                                />
                                <span>{this.props.t("Score")}</span>
                            </>
                        )}
                        {this.props.scoreMod !== "show" && (
                            <>
                                <Progress
                                    success={{percent: info.ACNumber / info.CaseNumber * 100}}
                                    type="dashboard"
                                    format={() => `${info.ACNumber} / ${info.CaseNumber}`}
                                />
                                <span>{this.props.t("通过数量")}</span>
                            </>
                        )}
                    </Col>
                </Row>
            </Card>
        )
    }
}


export default withTranslation()(JudgeResult)