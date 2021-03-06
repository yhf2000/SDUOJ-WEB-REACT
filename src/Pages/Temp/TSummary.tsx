import {Dispatch, useEffect, useState} from "react";
import {Button, Collapse, Image, Result, Space, Table} from "antd";
import logo from "Assert/img/sdu-logo.jpg"
import {withRouter} from "react-router-dom";
import {UrlPrefix} from "../../Config/constValue";
import Title from "antd/es/typography/Title";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {UserState} from "../../Type/Iuser";
import {testLoginTodo} from "../../Redux/Action/user";
import cApi from "Utils/API/c-api"
import eApi from "Utils/API/e-api"
import TextEllipsis from "../../Component/common/TextEllipsis";
import {unix2Time} from "../../Utils/Time";
import EReport from "../Exam/EReport";

const {Panel} = Collapse;


const TSummary = (props: any) => {

    const [data, setData] = useState<any>(undefined)
    const [dataExam, setDataExam] = useState<any>(undefined)
    const [score1, setScore1] = useState<number>(0)
    const [score2, setScore2] = useState<number>(0)
    const [score3, setScore3] = useState<number>(0)
    const [score4, setScore4] = useState<number>(0)
    const [score5, setScore5] = useState<number>(0)

    const getExam = async () => {
        const examIds = ["20", "22", "29", "19", "21", "24", "30"]
        let examInfo: any = {}, examGroupInfo: any = {}, examResult: any = {}
        for (let examId of examIds) {
            await eApi.getExamInfo(examId).then((v1: any) => {
                examInfo[examId] = v1
                return eApi.getExamResult(examId).then((v3: any) => {
                    examResult[examId] = v3
                    return Promise.resolve()
                })
            })
        }
        setDataExam({
            examInfo: examInfo, examResult: examResult
        })
    }

    useEffect(() => {
        if (!props.isLogin) {
            props.history.replace(UrlPrefix + "/login?to=" + props.location.pathname)
        } else {
            const timeoutScoreRatio1 = [["0", 1.0], ["604800001", 0.9], ["1209600001", 0.8], ["12960000000", 0.7]];
            const timeoutScoreRatio2 = [["0", 0.85], ["604800001", 0.8], ["1209600001", 0.75], ["12960000000", 0.7]];

            cApi.getContestReport({
                contestList: [
                    {contestId: "144", title: "week1", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "146", title: "week2", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "148", title: "week3", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "151", title: "week4", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "153", title: "week5", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "156", title: "week6", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "157", title: "week7", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "160", title: "week8", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "162", title: "week9", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "166", title: "week10", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "169", title: "week11", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "172", title: "week12", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "175", title: "week13", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "177", title: "week14", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},

                    {contestId: "145", title: "Month3-T3", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "155", title: "Month4-T3", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "167", title: "Month5-T3", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},
                    {contestId: "176", title: "Month6-T3", weight: 1.25, timeoutScoreRatio: timeoutScoreRatio1},

                    {contestId: "152", title: "Exam-T3-1", weight: 1.5, timeoutScoreRatio: timeoutScoreRatio2},
                    {contestId: "163", title: "Exam-T3-2", weight: 1.5, timeoutScoreRatio: timeoutScoreRatio2},
                    {contestId: "174", title: "Exam-T3-3", weight: 1.5, timeoutScoreRatio: timeoutScoreRatio2},
                ]
            }).then((value) => {
                setData(value)
                console.log(value)
            })
            getExam()
        }
    }, [])

    const hw = ["144", "146", "148", "151", "153", "156", "157", "160", "162", "166", "169", "172", "175", "177"]
    const mt3 = ["145", "155", "167", "176"]

    const ext3 = [
        {contestId: "152", examId: "20"},
        {contestId: "163", examId: "22"},
        {contestId: "174", examId: "29"}
    ]

    const ext124 = ["19", "21", "24", "30"]


    return (
        <>
            <Result
                icon={<Image src={logo} width={"180px"} preview={false}/>}
                title="2022?????????????????????????????? SDUOJ ?????????????????????90??????"
                subTitle={"????????????????????????????????????????????????????????????????????????????????????"}
            />
            <div style={{textAlign: "center", margin: "0 auto"}}>
                <div style={{paddingBottom: 50, paddingTop: 50}}>
                    {(() => {
                        if (data !== undefined) {
                            let sum = score1 + score2 + score3 + score4 + score5
                            return (
                                <Title level={4}>?????????????????????<span
                                    style={{color: "red"}}>{sum}???</span>/90??????</Title>
                            )
                        }
                    })()}
                    {(() => {
                        if (data !== undefined) {
                            let sum = score1 + score2 + score3 + score4
                            return (
                                <Title level={4}>??????????????????????????????????????????<span
                                    style={{color: "red"}}>{sum}???</span>/50??????</Title>
                            )
                        }
                    })()}
                </div>
                <div style={{textAlign: "left", maxWidth: "1200px", margin: "0 auto"}}>
                    <Collapse>
                        <Panel header={<>
                            {(() => {
                                if (data !== undefined) {
                                    let sum = 0
                                    hw.map((contestId: string) => {
                                        let d = data.filter((item: any) => item.contestId === contestId)[0]
                                        sum += d.sumScore / 100
                                    })
                                    if(sum !== score1) setScore1(sum)
                                    return (
                                        <Title level={3}>??????????????????<span
                                            style={{color: "red"}}>{sum}???</span>/16???=1*16???</Title>
                                    )
                                }
                            })()}
                        </>} key="1">
                            {data !== undefined && hw.map((contestId: string) => {
                                let d = data.filter((item: any) => item.contestId === contestId)[0]
                                return (
                                    <>
                                        <Collapse>
                                            <Panel
                                                header={<>
                                                    <Space>
                                                        <Title level={5}>
                                                            {d.contestTitle} - {d.sumScore}/100
                                                            - {d.sumScore / 100}
                                                        </Title>
                                                        <Button
                                                            type={"primary"}
                                                            size={"small"}
                                                            style={{marginBottom: 10}}
                                                            onClick={() => {
                                                                props.history.push(UrlPrefix + `/contest/${contestId}`)
                                                            }}
                                                        >
                                                            ???????????????
                                                        </Button>
                                                    </Space>
                                                </>}
                                                key={`${contestId}`}
                                            >
                                                <Table
                                                    size={"small"}
                                                    columns={[
                                                        {
                                                            title: "?????????",
                                                            dataIndex: "problemTitle",
                                                            width: 100,
                                                            render: (text) => {
                                                                return <TextEllipsis text={text}/>
                                                            }
                                                        },
                                                        {title: "??????", dataIndex: "score"},
                                                        {title: "??????", dataIndex: "weight"},
                                                        {
                                                            title: "??????????????????",
                                                            dataIndex: "submissionId",
                                                            render: (text: string) => {
                                                                if (text === "0") return "???????????????"
                                                                return text
                                                            }
                                                        },
                                                        {
                                                            title: "????????????",
                                                            dataIndex: "submitTime",
                                                            render: (text: any, row: any) => {
                                                                if (row.submissionId === "0") return ""
                                                                return unix2Time(text)
                                                            }
                                                        },
                                                        {
                                                            title: "????????????",
                                                            dataIndex: "timeoutRatio",
                                                            render: (text: any, row: any) => {
                                                                if (row.submissionId === "0") return ""
                                                                return text
                                                            }
                                                        },
                                                        {
                                                            title: "????????????",
                                                            dataIndex: "",
                                                            render: () => {
                                                                return "?????????"
                                                            }
                                                        },
                                                    ]}
                                                    dataSource={d.problemResults}
                                                />
                                            </Panel>
                                        </Collapse>
                                    </>
                                )
                            })}
                        </Panel>
                        <Panel header={<>
                            {(() => {
                                if (dataExam !== undefined) {
                                    let sum = 0
                                    ext124.map((value: string) => {
                                        let eResult = dataExam.examResult[value]
                                        sum += eResult.score / 400 * 5
                                    })
                                    if(sum !== score2) setScore2(sum)
                                    return (
                                        <Title level={3}>CSP?????????<span
                                            style={{color: "red"}}>{sum}???</span>/20???=4*5???</Title>
                                    )
                                }
                            })()}
                        </>} key="2">
                            {dataExam !== undefined && ext124.map((value: string) => {
                                const examId = value
                                let eInfo = dataExam.examInfo[examId]
                                let eResult = dataExam.examResult[examId]
                                return (
                                    <>
                                        <Collapse>
                                            <Panel
                                                header={<>
                                                    <Space>
                                                        <Title level={5}>
                                                            {eInfo.examTitle} - {eResult.score}/400
                                                            - {eResult.score / 400 * 5}
                                                        </Title>
                                                        <Button
                                                            type={"primary"}
                                                            size={"small"}
                                                            style={{marginBottom: 10}}
                                                            onClick={() => {
                                                                props.history.push(UrlPrefix + "/exam/report/" + examId)
                                                            }}
                                                        >
                                                            ?????????????????????
                                                        </Button>
                                                    </Space>
                                                </>}
                                                key={`${examId}`}
                                            >
                                                <EReport eid={examId}/>
                                            </Panel>
                                        </Collapse>
                                    </>
                                )


                            })}
                        </Panel>
                        <Panel header={<>
                            {(() => {
                                if (data !== undefined) {
                                    let sum = 0
                                    mt3.map((contestId: string) => {
                                        let d = data.filter((item: any) => item.contestId === contestId)[0]
                                        sum += d.sumScore / 100 * 2
                                    })
                                    if(sum !== score3) setScore3(sum)
                                    return (
                                        <Title level={3}>??????T3?????????<span
                                            style={{color: "red"}}>{sum}???</span>/8???=2*4???</Title>
                                    )
                                }
                            })()}
                        </>} key="3">
                            {data !== undefined && mt3.map((contestId: string) => {
                                let d = data.filter((item: any) => item.contestId === contestId)[0]
                                return (
                                    <>
                                        <Collapse>
                                            <Panel
                                                header={<>
                                                    <Space>
                                                        <Title level={5}>
                                                            {d.contestTitle} - {d.sumScore}/100
                                                            - {d.sumScore / 100 * 2}
                                                        </Title>
                                                        <Button
                                                            type={"primary"}
                                                            size={"small"}
                                                            style={{marginBottom: 10}}
                                                            onClick={() => {
                                                                props.history.push(UrlPrefix + `/contest/${contestId}`)
                                                            }}
                                                        >
                                                            ???????????????
                                                        </Button>
                                                    </Space>
                                                </>}
                                                key={`${contestId}`}
                                            >
                                                <Table
                                                    size={"small"}
                                                    columns={[
                                                        {
                                                            title: "?????????",
                                                            dataIndex: "problemTitle",
                                                            width: 100,
                                                            render: (text) => {
                                                                return <TextEllipsis text={text}/>
                                                            }
                                                        },
                                                        {title: "??????", dataIndex: "score"},
                                                        {title: "??????", dataIndex: "weight"},
                                                        {
                                                            title: "??????????????????",
                                                            dataIndex: "submissionId",
                                                            render: (text: string) => {
                                                                if (text === "0") return "???????????????"
                                                                return text
                                                            }
                                                        },
                                                        {
                                                            title: "????????????",
                                                            dataIndex: "submitTime",
                                                            render: (text: any, row: any) => {
                                                                if (row.submissionId === "0") return ""
                                                                return unix2Time(text)
                                                            }
                                                        },
                                                        {
                                                            title: "????????????",
                                                            dataIndex: "timeoutRatio",
                                                            render: (text: any, row: any) => {
                                                                if (row.submissionId === "0") return ""
                                                                return text
                                                            }
                                                        },
                                                        {
                                                            title: "????????????",
                                                            dataIndex: "",
                                                            render: () => {
                                                                return "?????????"
                                                            }
                                                        },
                                                    ]}
                                                    dataSource={d.problemResults}
                                                />
                                            </Panel>
                                        </Collapse>
                                    </>
                                )
                            })}
                        </Panel>
                        <Panel header={<>
                            {(() => {
                                if (data !== undefined && dataExam !== undefined) {
                                    let sum = 0
                                    ext3.map((item: any) => {
                                        const contestId = item.contestId
                                        const examId = item.examId
                                        let d = data.filter((item: any) => item.contestId === contestId)[0]
                                        let eResult = dataExam.examResult[examId]

                                        let ds: any = [], cnt = 0, sumScore = 0
                                        for (let x of d.problemResults) {
                                            let examScore = eResult.problemGroupResult[0].problemResult[0][cnt].realScore
                                            ds.push({
                                                ...x,
                                                examScore: examScore,
                                                finalScore: Math.max(examScore, x.score)
                                            })
                                            sumScore += Math.max(examScore, x.score)
                                            cnt++;
                                        }
                                        sum += sumScore / 100 * 2
                                    })
                                    if(sum !== score4) setScore4(sum)
                                    return (
                                        <Title level={3}>T3?????????<span
                                            style={{color: "red"}}>{sum}???</span>/6???=2*3???</Title>
                                    )
                                }
                            })()}
                        </>} key="4">
                            {data !== undefined && dataExam !== undefined && ext3.map((item: any) => {
                                const contestId = item.contestId
                                const examId = item.examId
                                let d = data.filter((item: any) => item.contestId === contestId)[0]
                                let eInfo = dataExam.examInfo[examId]
                                let eResult = dataExam.examResult[examId]

                                let ds: any = [], cnt = 0, sumScore = 0
                                for (let x of d.problemResults) {
                                    let examScore = eResult.problemGroupResult[0].problemResult[0][cnt].realScore
                                    ds.push({
                                        ...x,
                                        examScore: examScore,
                                        finalScore: Math.max(examScore, x.score)
                                    })
                                    sumScore += Math.max(examScore, x.score)
                                    cnt++;
                                }

                                return (
                                    <>
                                        <Collapse>
                                            <Panel
                                                header={<>
                                                    <Space>
                                                        <Title level={5}>
                                                            {eInfo.examTitle} - {sumScore}/100
                                                            - {sumScore / 100 * 2}
                                                        </Title>
                                                        <Button
                                                            type={"primary"}
                                                            size={"small"}
                                                            style={{marginBottom: 10}}
                                                            onClick={() => {
                                                                props.history.push(UrlPrefix + "/exam/report/" + examId)
                                                            }}
                                                        >
                                                            ?????????????????????
                                                        </Button>
                                                        <Button
                                                            type={"primary"}
                                                            size={"small"}
                                                            style={{marginBottom: 10}}
                                                            onClick={() => {
                                                                props.history.push(UrlPrefix + "/contest/" + contestId)
                                                            }}
                                                        >
                                                            ???????????????
                                                        </Button>
                                                    </Space>
                                                </>}
                                                key={`${contestId}`}
                                            >
                                                <Table
                                                    size={"small"}
                                                    columns={[
                                                        {
                                                            title: "?????????",
                                                            dataIndex: "problemTitle",
                                                            width: 100,
                                                            render: (text) => {
                                                                return <TextEllipsis text={text}/>
                                                            }
                                                        },
                                                        {title: "????????????", dataIndex: "finalScore"},
                                                        {title: "????????????", dataIndex: "examScore"},
                                                        {title: "????????????", dataIndex: "score"},
                                                        {
                                                            title: "????????????????????????",
                                                            dataIndex: "submissionId",
                                                            render: (text: string) => {
                                                                if (text === "0") return "???????????????"
                                                                return text
                                                            }
                                                        },
                                                        {
                                                            title: "??????????????????",
                                                            dataIndex: "submitTime",
                                                            render: (text: any, row: any) => {
                                                                if (row.submissionId === "0") return ""
                                                                return unix2Time(text)
                                                            }
                                                        },
                                                        {
                                                            title: "??????????????????",
                                                            dataIndex: "timeoutRatio",
                                                            render: (text: any, row: any) => {
                                                                if (row.submissionId === "0") return ""
                                                                return text
                                                            }
                                                        },
                                                        {
                                                            title: "??????????????????",
                                                            dataIndex: "",
                                                            render: () => {
                                                                return "?????????"
                                                            }
                                                        },
                                                    ]}
                                                    dataSource={ds}
                                                />
                                            </Panel>
                                        </Collapse>
                                    </>
                                )
                            })}
                        </Panel>
                        <Panel header={<>
                            {(() => {
                                if (data !== undefined) {
                                    let sum = 0
                                    // mt3.map((contestId: string) => {
                                    //     let d = data.filter((item: any) => item.contestId === contestId)[0]
                                    //     sum += d.sumScore / 100 * 1.25
                                    // })
                                    if(sum !== score5) setScore5(sum)
                                    return (
                                        <Title level={3}>???????????????<span
                                            style={{color: "red"}}>{sum}???</span>/40??????</Title>
                                    )
                                }
                            })()}
                        </>} key="5">
                            ??????
                        </Panel>
                    </Collapse>
                </div>
                <div style={{paddingBottom: 100, paddingTop: 100}}>
                    <Title level={4}>????????????????????????10??????</Title>
                    <Title level={5}>?????????3??????</Title>
                    ??????????????????????????????????????????????????????????????????????????????????????????????????????3?????????????????????<br/>
                    ????????????3???????????????????????????0.5??????????????????????????????<br/><br/>
                    <Title level={5}>???????????????7??????</Title>
                    ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? 7 ???<br/>
                </div>
            </div>
        </>
    );

}

const mapStateToProps = (state: any) => {
    const UState: UserState = state.UserReducer
    return {
        isLogin: UState.isLogin,
        userInfo: UState.userInfo
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    testLogin: () => dispatch(testLoginTodo())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withTranslation()(
        withRouter(TSummary)
    )
)