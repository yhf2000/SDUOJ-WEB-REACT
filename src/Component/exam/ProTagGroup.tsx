import React, {Component} from "react";

import Meta from "antd/lib/card/Meta";
import ProTag from "./ProTag";
import {Col, Row} from "antd";

interface IProTagGroup {
    title: string
    proList: number[]
}

export default class ProTagGroup extends Component<IProTagGroup, any> {

    render() {
        return (
            <>
                <Meta
                    className={"ProTagGroup"}
                    title={this.props.title}
                    description={
                        <Row gutter={[0, 16]}>
                            {
                                this.props.proList.map((index: number) => {
                                    return (
                                        <Col span={3}>
                                            <ProTag ProIndex={index} ProURL={""} TagState={["d"]}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    }
                />
            </>
        )
    }
}