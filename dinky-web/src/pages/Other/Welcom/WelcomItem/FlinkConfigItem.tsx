import {Flex, Input, Space, Switch, Typography} from "antd";

import {WelcomPic1} from "@/components/Icons/WelcomIcons";
import FormItem from "antd/es/form/FormItem";
import {WelcomProps} from "@/pages/Other/Welcom";
import {LoadingBtn} from "@/components/CallBackButton/LoadingBtn";
import {l} from "@/utils/intl";

const {Title, Text, Link} = Typography;

const FlinkConfigItem = (prop: WelcomProps) => {

  return (
    <Flex>
      <div>
        <Space>
          <Title>{l('welcom.flink.config.title')}</Title>
        </Space>
        <br/>
        <Text type={"success"}>{l('welcom.tips')}</Text>
        <br/>
        <br/>

        <FormItem label={l('welcom.flink.config.jobwait.title')}>
          <Text type={"secondary"}>{l('welcom.flink.config.jobwait')}</Text>
          <FormItem name='sys.flink.settings.jobIdWait'>
            <Input type={"number"}/>
          </FormItem>
        </FormItem>

        <FormItem label={l('welcom.flink.config.useHistoryServer.title')}>
          <Text type={"secondary"}>{l('welcom.flink.config.useHistoryServer')}</Text>
          <br/>
          <FormItem name="sys.flink.settings.useFlinkHistoryServer">
            <Switch/>
          </FormItem>
        </FormItem>

        <FormItem label={l('welcom.flink.config.historyPort.title')}>
          <Text type={"secondary"}>{l('welcom.flink.config.historyPort')}</Text>
          <FormItem name="sys.flink.settings.flinkHistoryServerPort">
            <Input type={"number"}/>
          </FormItem>
        </FormItem>

        <LoadingBtn
          props={{
            type: "primary",
            size: "large"
          }}
          title={l('welcom.submit')}
          click={async () => await prop.onSubmit?.()}
        />

        <Link onClick={prop.onPrev}> {l('welcom.prev')}</Link>
      </div>
      <WelcomPic1 size={500}/>
    </Flex>
  )
}
export default FlinkConfigItem;
