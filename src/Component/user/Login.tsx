import React, {Component, CSSProperties, Dispatch, useRef, useState} from "react";
import {Button, Card, FormInstance, message, Space, Tabs} from "antd";
import {LoginForm, ProFormCheckbox, ProFormInstance, ProFormText} from "@ant-design/pro-form";
import {
    UserOutlined,
    MobileOutlined,
    LockOutlined,
    QqOutlined,
    WeiboOutlined,
    WechatOutlined,
} from '@ant-design/icons';
import ThirdPartyLoginSDUCAS from "./ThirdPartyLoginSDUCAS";
import {withTranslation} from "react-i18next";
import {ConfigState} from "../../Type/IConfig";
import {getCopyRightTodo} from "../../Redux/Action/config";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {userLoginTodo} from "../../Redux/Action/user";
import {loginInfo} from "../../Type/types";
import Logo from "Assert/img/sduoj.png"
import Register from "./Form/Register";
import ForgetPass from "./Form/ForgetPass";

type LoginType = 'SDUCAS' | 'account';


const Login = (props: any) => {

    const formRef = useRef<ProFormInstance>()
    const [loginType, setLoginType] = useState<LoginType>("account")

    return (
        <Card
            style={{width: "400px", textAlign: "center", margin: "0 auto"}}>
            <LoginForm
                formRef={formRef}
                logo={Logo}
                title="用户登录"
                subTitle="山东大学在线评测系统"
                actions={
                    <></>
                }
                submitter={{
                    resetButtonProps: false,
                    submitButtonProps: {block: true},
                    searchConfig: {
                        submitText: props.t("Login")
                    },
                    render: (prop, def) => {
                        if (loginType !== 'SDUCAS') return def
                        return <ThirdPartyLoginSDUCAS/>
                    },
                    onSubmit: () => {
                        formRef.current?.validateFieldsReturnFormatValue?.()?.then((value) => {
                            props.login(value)
                        })
                    }
                }}
            >
                <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
                    <Tabs.TabPane key={'account'} tab={'账号密码登录'}/>
                    <Tabs.TabPane key={'SDUCAS'} tab={'统一身份认证登录'}/>
                </Tabs>
                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'}/>,
                                onPressEnter: ()=>{
                                    formRef.current?.validateFieldsReturnFormatValue?.()?.then((value) => {
                                        props.login(value)
                                    })
                                }
                            }}
                            placeholder={'请输入用户名'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}

                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'}/>,
                                onPressEnter: ()=>{
                                    formRef.current?.validateFieldsReturnFormatValue?.()?.then((value) => {
                                        props.login(value)
                                    })
                                }
                            }}
                            placeholder={'请输入密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                    </>
                )}
                {
                    loginType === 'account' && (
                        <div>
                            <Space style={{
                                float: 'right',
                            }}>
                                <Register button={<Button type={"link"} size={"small"}>注册</Button>}/>
                                <ForgetPass button={<Button type={"link"} size={"small"}>忘记密码</Button>}/>
                            </Space>
                        </div>
                    )
                }
            </LoginForm>
        </Card>
    )
}


const mapStateToProps = (state: any) => {
    const CState: ConfigState = state.ConfigReducer
    // console.log("ELayout", CState.copyRight)
    return {
        copyRight: CState.copyRight
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    login: (data: loginInfo) => dispatch(userLoginTodo(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withTranslation()(
        withRouter(Login)
    ))