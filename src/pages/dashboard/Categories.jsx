import React, {Component} from 'react';

import Item from './item';
import {PageHeader, Button, Spin, Icon} from 'antd';

class Categories extends Component {
  state = {
    subscriptions: null,
  };
  calLeftDay = (renewal) => {
    const leftTime = new Date(renewal) - new Date(new Date().toISOString().slice(0, 10));
    return (leftTime / (1000 * 3600 * 24));
  };

  sortByPrice = (subscriptions) => {
    // subscriptions.sort((a, b) => (a.price > b.price) ? -1: 1);
    const sortedSubscriptions = Object.assign([], subscriptions).sort((a, b) => (a.price > b.price) ? -1 : 1);
    this.setState({subscriptions: sortedSubscriptions}, () => {
      console.log(this.state);
    });
  };

  sortByLeftDay = (subscriptions) => {
    const sortedSubscriptions = Object.assign([], subscriptions).sort((a, b) => (this.calLeftDay(a) > this.calLeftDay(b)) ? -1 : 1);
    this.setState({subscriptions: sortedSubscriptions}, () => {
      console.log(this.state);
    });
  };

  showUserSubsList = () =>{
    const list = this.props.data.map(
      (data, index) => (
        <Item key={index} data={data}/>
      )
    );
    return list;
  };

  render() {
    const {data} = this.props;

    if (this.props.data == null) {
      const icon = <Icon type="loading" style={{fontSize: 24}} spin />;
      return (<Spin indicator={icon} />);
    }

    return (
      <div>
        {/*  구독 중인 서비스*/}
        <p><u> 구독 중인 서비스 </u></p>
        <PageHeader title="구독 중인 서비스"
          extra={[
            <Button key="2" onClick={() => {this.sortByPrice(data);}}>가격 순</Button>,
            <Button key="1" onClick={() => {this.sortByLeftDay(data);}}>남은 일</Button>,
          ]}>
        </PageHeader>
        <br/>
        <div>
          {this.showUserSubsList()}
        </div>
        <br/>
      </div>
    );
  }
}

export default Categories;
