import {Modal, ModalContent} from "./ModalComponent.styled";
import {Dispatch, ReactNode, SetStateAction} from "react";
interface Props {
    active: boolean,
    setActive: Dispatch<SetStateAction<boolean>>,
    children: ReactNode
}

export const ModalComponent = (props: Props) => {
    const {} = props
    return(
        <Modal onClick={() => props.setActive(false)} className={props.active ? 'active' : ''}>
            <ModalContent className={props.active ? 'active' : ''} onClick={e => e.stopPropagation()}>
                {props.children}
            </ModalContent>
        </Modal>
    );
}

export default ModalComponent