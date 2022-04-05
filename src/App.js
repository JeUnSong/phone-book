import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';


class App extends Component {
  id=2;
  state={
    information:[
      {
        id:0,
        name:"김민준",
        phone:"010-0000-0000"
      },
      {
        id:1,
        name:"홍길동",
        phone:"010-0000-0000"
      }
    ],
    keyword: ''
  };
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  }
  //등록
  handleCreate = (data) => {
    //구조분해할당
    const { information } = this.state;
    //state를 변경. 배열에 추가하
    this.setState({
      information: information.concat({id:this.id++,...data}) // spread syntax사용
    });
  }
  //삭제
  handleRemove = (id) => {
    const { information } = this. state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }
  //수정
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
      info => id === info.id
      ?{...info,...data} // 새객체를 만들어 기존의 값과 전달받은 data를 덮엇씀
      : info // 기존의 값을 그대로 유지
      )
    })
  }

  render() {
    //구조분해할당
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );
    return (
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        <p>
          <input
            placeholder='검색 할 이름을 입력하세요.'
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <PhoneInfoList 
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />

      </div>
    );
  }
}

export default App;
