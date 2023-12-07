import { Text, View, Pressable, TouchableOpacity, Image, TextInput } from 'react-native';
import { Menu, Radio } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ChevronDownIcon } from 'react-native-heroicons/mini';
import DatePicker from 'react-native-date-picker';
import { useForm, usePermission } from '../../hooks';
import { blue, lightGray } from '../../utils/theme';
import { Button, Heading } from '..';
import { PermissionForm as PermissionFormInterface } from '../../ts/permissions';

interface PermissionFormProps {
  status: 'creation' | 'reading' | 'edition' | 'approval'
}

const PermissionForm = ({ status = 'creation' }: PermissionFormProps) => {
  const { changeValue, tiposol, finicial, hsalida, ffinal, hingreso, totald, tipomot, hcita, lugar, mot, fsolicita, isPickerOpen, pickerMode, currentPickerValue } = useForm<PermissionFormInterface>({
    tiposol: '', finicial: '', hsalida: '', ffinal: '', hingreso: '', totald: '', tipomot: '', hcita: '', lugar: '', mot: '', fsolicita: '', isPickerOpen: false, pickerMode: 'date', currentPickerValue: '',
  });

  const { createPermission } = usePermission();

  return (
    <>
      {/* form */}
      <View className='mt-5 px-3 space-y-5'>

        {/* type */}
        <View className='space-y-3'>

          {/* permission type */}
          <View>
            <Heading text='Tipo:' size='xl' />
            <Menu style={{ backgroundColor: lightGray, borderRadius: 20, marginTop: 5 }}
              shadow={1}
              w={wp(55)} 
              trigger={triggerProps =>  
                <Pressable className='flex-row items-center rounded-lg bg-light-gray' 
                  style={{ height: wp(7), width: wp(55) }} 
                  {...triggerProps}
                >
                  <Text className='flex-1 text-center text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(4) }}>
                    {tiposol || ''}
                  </Text>

                  <View className='right-2'>
                    <ChevronDownIcon size={18} color={blue} strokeWidth={2} />
                  </View>
                </Pressable>
              }
            >
              {['Permiso', 'Ausencia'].map((item) => (
                <Menu.Item key={item} onPress={() => changeValue('tiposol', item)} style={{ borderBottomColor: blue }}>
                  <Text className='font-normal text-typography'>{item}</Text>
                </Menu.Item>
              ))}
            </Menu>
          </View>

          {/* dates */}
          <View className='flex-row items-center justify-between'>

            {/* start */}
            <View>
              <Heading text='Salida' size='lg' />
              <View className='flex-row items-center space-x-2'>
                <View>
                  <Heading text='Fecha' size='sm' />
                  <View className='justify-center items-center rounded-lg bg-light-gray' 
                    style={{ height: wp(7), width: wp(30) }}
                  >
                    <TouchableOpacity className='flex-row items-center'
                      onPress={() => {
                        changeValue('pickerMode', 'date');
                        changeValue('isPickerOpen', true);
                      }}
                    >
                      <Image style={{ width: wp(5), height: wp(5) }} resizeMode='cover'
                        source={require('../../assets/calendar.png')}
                      />
                      <Text className='pl-2 text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
                        {finicial || 'dd-mm-aaaa'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Heading text='Hora' size='sm' />
                  <View className='items-center justify-center rounded-lg bg-light-gray'
                    style={{ height: wp(7), width: wp(13) }} 
                  >
                    <TouchableOpacity>
                      <Text className='text-center text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
                        {hsalida || 'hh-mm'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* end */}
            <View>
              <Heading text='Ingreso' size='lg' />
              <View className='flex-row items-center space-x-2'>
                <View>
                  <Heading text='Fecha' size='sm' />
                  <View className='justify-center items-center rounded-lg bg-light-gray' 
                    style={{ height: wp(7), width: wp(30) }}
                  >
                    <TouchableOpacity onPress={() => ''} className='flex-row items-center'>
                      <Image style={{ width: wp(5), height: wp(5) }} resizeMode='cover'
                        source={require('../../assets/calendar.png')}
                      />
                      <Text className='pl-2 text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
                        {ffinal || 'dd-mm-aaaa'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Heading text='Hora' size='sm' />
                  <View className='items-center justify-center rounded-lg bg-light-gray'
                    style={{ height: wp(7), width: wp(13) }} 
                  >
                    <TouchableOpacity>
                      <Text className='text-center text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
                        {hingreso || 'hh-mm'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

          </View>

          {/* total hours */}
          <View className='flex-row justify-between'>
            <Heading text='Total de Horas' size='lg' />
            <View className='flex-row items-center justify-center rounded-lg bg-light-gray' 
              style={{ height: wp(7), width: wp(50) }}
            >
              <Text className='text-center text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
                {totald}
              </Text>
            </View>
          </View>

        </View>

        {/* details */}
        <View className='space-y-3'>

          {/* reason and appointment time */}
          <View>
            <Heading text='Detalles:' size='xl' />
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center space-x-3'>
                <Heading text='Motivo:' size='lg' />
                <Radio.Group className='flex-row items-center space-x-1'
                  name='reason' 
                  value={tipomot} 
                  onChange={nextValue => changeValue('tipomot', nextValue)}
                >
                  <Radio shadow={2} value='M' size='sm' fontFamily='Poppins-Regular' colorScheme='darkBlue'>Médico</Radio>
                  <Radio shadow={2} value='O' size='sm' fontFamily='Poppins-Regular' colorScheme='darkBlue'>Otro</Radio>
                </Radio.Group>
              </View>

              <View className='flex-row items-center space-x-2'>
                <Heading text='Hora:' size='lg' />
                <View className='items-center justify-center rounded-lg bg-light-gray'
                  style={{ height: wp(7), width: wp(13) }} 
                >
                  <TouchableOpacity>
                    <Text className='text-center text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
                      {hcita || 'hh-mm'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* place */}
          <View className='flex-row items-center justify-between'>
            <Heading text='Lugar' size='lg' />
            <TextInput className='px-2 rounded-lg text-typography bg-light-gray'
              style={{ height: wp(10), width: wp(75), fontFamily: 'Poppins-Regular', fontSize: wp(3) }}
              value={lugar}
              onChangeText={(text) => changeValue('lugar', text)}
              selectionColor={blue}
            />
          </View>

          {/* description */}
          <View>
            <Heading text='Descripción del motivo:' size='lg' />
            <TextInput className='w-full px-2 rounded-lg text-typography bg-light-gray'
              style={{ minHeight: wp(12), maxHeight: wp(18), fontFamily: 'Poppins-Regular', fontSize: wp(3) }}
              value={mot}
              onChangeText={(text) => changeValue('mot', text)}
              selectionColor={blue}
              multiline={true}
            />
          </View>

        </View>
      </View>
      
      {/* buttons */}
      <View className='flex-1 justify-end px-3 pb-3'>
        <Button onPress={() => createPermission({ tiposol, finicial, hsalida, ffinal, hingreso, totald, tipomot, hcita, lugar, mot, fsolicita })} 
          width={100} 
          text='Realizar Solicitud' 
        />
      </View>

      {/* picker */}
      <DatePicker
        modal
        mode={pickerMode}
        open={isPickerOpen}
        date={new Date()}
        onConfirm={(date) => {
          changeValue('isPickerOpen', false);
          changeValue(currentPickerValue, date);
        }}
        onCancel={() => {
          changeValue('isPickerOpen', false);
        }}
      />
    </>
  );
};

export default PermissionForm;