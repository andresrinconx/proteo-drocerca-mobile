import { ScrollView } from 'react-native';
import { Modal as ModalNativeBase } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type ModalProps = {
  children: React.JSX.Element;
  bgColor: string; 
  isModalOpen: boolean; 
  setIsModalOpen: (openModal: boolean) => void;
  width?: number;
  minHeight?: number;
  maxHeight?: number;
  borderRadius?: number;
}

const Modal = ({ children, bgColor, width, minHeight, maxHeight, borderRadius, isModalOpen, setIsModalOpen }: ModalProps) => {
  return (
    <ModalNativeBase isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} animationPreset='fade'>
      <ModalNativeBase.Content className='flex-col items-center mb-0' style={{ 
        backgroundColor: bgColor, 
        width: width ? wp(width) : wp(95), 
        minHeight: minHeight ? wp(minHeight) : wp(127), 
        maxHeight: maxHeight ? wp(maxHeight) : wp(127), 
        borderRadius: borderRadius ? borderRadius : 10,
      }}>
        <ModalNativeBase.CloseButton />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {children}
        </ScrollView>
      </ModalNativeBase.Content>
    </ModalNativeBase>
  );
};

export default Modal;