import React from "react";


export type ManageAction = addManageInitData

interface addManageInitData{
    type: "addManageInitData",
    key: string,
    data: any
}