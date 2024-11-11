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

import { Button, Flex, Input, Space, Typography } from 'antd';
import { Congratulations, Magic, WelcomPic1 } from '@/components/Icons/WelcomIcons';
import { useState } from 'react';

const { Title, Paragraph, Text, Link } = Typography;

const WelcomItem = (prop: { onSubmit: (pwd: string) => void }) => {
  const { onSubmit } = prop;

  const [pwd, setPwd] = useState<string>('');

  return (
    <Flex>
      <div>
        <Space>
          <Congratulations size={60} />
          <Title>欢迎来到Dinky！</Title>
        </Space>
        <br />
        <Text type={'secondary'}>为 Apache Flink 深度定制的新一代实时计算平台，</Text>
        <Text type={'secondary'}>
          提供敏捷的 Flink SQL, Flink Jar 作业开发、 部署及监控能力，助力实时计算高效应用。
        </Text>
        <br />
        <br />
        <Text>这看起来好像是你第一次登入Dinky</Text>
        <br />
        <Text>别担心，我们只需要几步简单的向导即可畅享Dinky之旅！</Text>
        <Flex
          style={{ width: '80%', height: '80%' }}
          justify={'center'}
          align={'flex-start'}
          gap={'middle'}
          vertical
        >
          <Title level={4}>设置admin密码：</Title>

          <Input
            required
            placeholder='*********'
            size={'large'}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />

          <Button
            type={'primary'}
            style={{ width: '100%' }}
            size={'large'}
            onClick={() => onSubmit(pwd)}
          >
            设置密码
          </Button>
        </Flex>
      </div>
      <WelcomPic1 size={500} />
    </Flex>
  );
};
export default WelcomItem;
