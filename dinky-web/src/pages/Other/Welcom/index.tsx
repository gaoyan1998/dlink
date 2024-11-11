import {Button, Flex, message, Steps} from "antd";
import {useState} from "react";
import WelcomItem from "@/pages/Other/Welcom/WelcomItem/WelcomItem";

const boxStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: 6,
};



const Welcom = () => {

    const [current, setCurrent] = useState(0);

    const changePwd =(pwd:string)=>{
        setCurrent(current + 1);
    }

    const steps = [
        {
            title: 'First',
            content: <WelcomItem onSubmit={changePwd} />,
        },
        {
            title: 'Second',
            content: 'Second-content',
        },
        {
            title: 'Last',
            content: 'Last-content',
        },
    ];


    return   (
        <Flex style={boxStyle} justify={"center"} align={"center"}>
            <div style={{height: '60vh', background: 'white', width: '50%'}}>
                {/*<Steps current={current} items={items}/>*/}
                <div>{steps[current].content}</div>
            </div>
        </Flex>
    )
}

export default Welcom;
