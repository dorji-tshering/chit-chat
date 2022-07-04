import classNames from 'classnames'
import styled from 'styled-components'

import Close from '../Icons/Close'

const Container = styled.div`
  position: fixed;
  z-index: 6;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 30px 0;
  left: 0;
  top: 0;

  .modal {
    z-index: 2;
    position: relative;

    background-color: black;
    border-radius: 20px;

    .close-btn {
      position: relative;
      left: -10px;
    }

    &.logout-modal {
        position: absolute;
        bottom: 127px;
        left: 30px;
    }
  }
`

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0; 
  top: 0;
  background-color: rgba(255, 255, 255, 0.2);

  &.logout {
      background-color: transparent;
  }
`


export default function Modal({ className, backdropClassName, children, onClickOutside }) {
    return (
      <Container>
        <Backdrop className={classNames('backdrop', backdropClassName)} onClick={() => onClickOutside()} />
        <div className={classNames('modal', className)}>
          <button onClick={onClickOutside} className="close-btn">
            <Close color="white" size={24} />
          </button>
          {children}
        </div>
      </Container>
    )
}