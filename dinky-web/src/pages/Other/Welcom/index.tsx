import {Flex, Form} from "antd";
import {useState} from "react";
import WelcomItem from "@/pages/Other/Welcom/WelcomItem/WelcomItem";
import BaseConfigItem from "@/pages/Other/Welcom/WelcomItem/BaseConfigItem";
import FlinkConfigItem from "@/pages/Other/Welcom/WelcomItem/FlinkConfigItem";
import FinishPage from "@/pages/Other/Welcom/WelcomItem/FinishPage";
import {log} from "@antv/g6/lib/utils/scale";
import {history, useRequest} from "@@/exports";
import {API_CONSTANTS} from "@/services/endpoints";
import {GLOBAL_SETTING_KEYS} from "@/types/SettingCenter/data";
import {postAll} from "@/services/api";
import {sleep} from "@antfu/utils";

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: 6,
};

export type WelcomProps = {
  onNext: () => void
  onPrev: () => void
  onSubmit?: () => void
}

const Welcom = () => {

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [current, setCurrent] = useState(0);

  const {data,loading} = useRequest(API_CONSTANTS.GET_NEEDED_CFG);

  const setCfgReq = useRequest((params)=>postAll(API_CONSTANTS.SET_INIT_CFG,params),{manual: true})

  const next = () => {
    setFormData((prev)=>{
      return {...prev,...form.getFieldsValue()}
    })
    setCurrent(current + 1);
  }
  const prev = () => {
    setCurrent(current - 1);
  }

  const submit = async () => {
    const data = {...formData, ...form.getFieldsValue()}
    await setCfgReq.run(data)
    next()
  }

  return (
    <Flex style={boxStyle} justify={"center"} align={"center"}>
      <div style={{height: '60vh', background: 'white', width: '50%'}}>
        {loading?<div>loading</div>:
          <Form
            form={form}
            initialValues={data}
            layout="vertical"
          >
            {current == 0 && <WelcomItem onNext={next} onPrev={prev}/>}
            {current == 1 && <BaseConfigItem onNext={next} onPrev={prev}/>}
            {current == 2 && <FlinkConfigItem onNext={next} onPrev={prev} onSubmit={submit}/>}
            {current == 3 && <FinishPage/>}
          </Form>}

      </div>
    </Flex>
  )
}

export default Welcom;
