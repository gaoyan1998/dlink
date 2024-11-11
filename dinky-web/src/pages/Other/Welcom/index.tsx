/*
 *
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import { Button, Flex, message, Steps } from 'antd';
import { useState } from 'react';
import WelcomItem from '@/pages/Other/Welcom/WelcomItem/WelcomItem';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: 6
};

const Welcom = () => {
  const [current, setCurrent] = useState(0);

  const changePwd = (pwd: string) => {
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: 'First',
      content: <WelcomItem onSubmit={changePwd} />
    },
    {
      title: 'Second',
      content: 'Second-content'
    },
    {
      title: 'Last',
      content: 'Last-content'
    }
  ];

  return (
    <Flex style={boxStyle} justify={'center'} align={'center'}>
      <div style={{ height: '60vh', background: 'white', width: '50%' }}>
        {/*<Steps current={current} items={items}/>*/}
        <div>{steps[current].content}</div>
      </div>
    </Flex>
  );
};

export default Welcom;
