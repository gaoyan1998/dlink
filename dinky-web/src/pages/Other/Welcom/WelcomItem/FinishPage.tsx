import {Button, Result} from "antd";
import {l} from "@/utils/intl";

const FinishPage = () => {

  return  <Result
    status="success"
    title={l('welcom.finish.title')}
    subTitle={l('welcom.finish')}
    extra={[
      <Button type="primary" onClick={() => window.location.href = '/login'}>
        {l('welcom.goLogin')}
      </Button>,
    ]}
  />
}
export default FinishPage
