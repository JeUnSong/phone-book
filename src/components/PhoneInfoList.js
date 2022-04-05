import React, { Component } from "react";
import PhoneInfo from "./PhoneInfo";

class PhoneInfoList extends Component {
    static defaultProps = {
        data: [],
        onRemove: () => console.warn('onRemove not defined'),
        onUpdate: () => console.warn('onUpdate not defined')
    }
    //컴포넌트가 수정 될 때 rendering여부를 결정. return값이 true이면 render()호출 false이면 호출되지 않음
    shouldComponentUpdate(nextProps, nextState) {
        //props가 변경되면 true
        return nextProps.data !== this.props.data;
    }

    render() {
        //얼마나 자주 render()가 호출되는지 확인
        console.log('render PhoneInfoList');
        //구조분해할당
        const { data, onRemove, onUpdate } = this.props;
        //map을 이용해서 배열의 요소를 하나씩 처리. map의 리턴값은 배열
        const list = data.map(info => (
            <PhoneInfo 
                key={info.id} 
                info={info}
                onRemove={onRemove}
                onUpdate={onUpdate}
            />)
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default PhoneInfoList