import React, { Component } from "react";

class PhoneInfo extends Component {
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        }
    }

    state = {
        editing: false,
        name:'',
        phone:''
    }

    //삭제버튼 클릭시 호출
    handleRemove = () => {
        // 삭제 버튼이 클릭되면 onRemove에 id 넣어서 호출
        //구조분해 할당
        const { info, onRemove } = this.props;
        //App컴포넌트의 handleRemove가 호출됨
        onRemove(info.id);
    }
    
    // editing 값을 반전시키는 함수
    // true -> false, false -> true
    handleToggleEdit = () => {
        const { editing } = this.state;
        this.setState({ editing: !editing });
    }

    // input 에서 onChange 이벤트가 발생 될 때
    // 호출되는 함수
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { info, onUpdate } = this.props;
        if(!prevState.editing && this.state.editing) {
            // editing 값이 false -> true로 전환 될때
            // info의 값을 state에 넣어준다
            this.setState({
                name: info.name,
                phone: info.phone
            })
        }

        shouldComponentUpdate(nextProps, nextState); {
            // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
            if (!this.state.editing
            && !nextState.editing
            && nextProps.info === this.props.info) {
                return false;
            }
            // 나머지 경우엔 리렌더링함
            return true;
        }

        if (prevState.editing && !this.state.editing) {
            // editing 값이 true -> false 로 전환 될 때
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        }
    }

    render() {
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };

        const { editing } = this.state;

        if (editing) { // 수정모드
            return (
                <div style={style}>
                    <div>
                        <input
                            value={this.state.name}
                            name="name"
                            placeholder="이름"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            value={this.state.phone}
                            name="phone"
                            placeholder="전화번호"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button onClick={this.handleToggleEdit}>적용</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            )
        }
        //일반모드
        //구조분해할당
        const {name, phone, id} = this.props.info;

        return (
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleToggleEdit}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}

export default PhoneInfo;