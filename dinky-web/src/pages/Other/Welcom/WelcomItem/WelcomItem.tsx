import {Button, Flex, Input, Space, Typography} from "antd";
import {Congratulations, WelcomPic1} from "@/components/Icons/WelcomIcons";
import FormItem from "antd/es/form/FormItem";
import {WelcomProps} from "@/pages/Other/Welcom";
import {l} from "@/utils/intl";

const {Title,  Text, Link} = Typography;


const WelcomItem = (prop: WelcomProps) => {

  return (
    <Flex>
      <div>
        <Space>
          <Congratulations size={60}/>
          <Title>{l('welcom.welcom')}</Title>
        </Space>
        <br/>
        <Text
          type={"secondary"}
        >
          {l('welcom.welcom.content')}
        </Text>
        <br/>
        <br/>
        <Text>
          {l('welcom.welcom.content.tip1')}
        </Text>
        <br/>
        <Text>
          {l('welcom.welcom.content.tip2')}
        </Text>
        <Flex
          style={{width: '80%', height: '80%'}}
          justify={"center"}
          align={"flex-start"}
          gap={"middle"}
          vertical
        >
          <Title level={4}>{l('welcom.welcom.setPwd.tip')}</Title>

          <FormItem name="password" style={{width: '100%', margin: '0px'}}>
            <Input
              placeholder="password"
              type={"password"}
              size={"large"}
            />
          </FormItem>

          <Button
            type={"primary"}
            style={{width: '100%'}}
            size={"large"}
            onClick={prop.onNext}
          >
            {l('welcom.welcom.setPwd')}
          </Button>
          <Link onClick={() => prop.onNext()}>{l('welcom.welcom.skip')}</Link>
        </Flex>
      </div>
      <WelcomPic1 size={500}/>
    </Flex>
  )
}
export default WelcomItem;
