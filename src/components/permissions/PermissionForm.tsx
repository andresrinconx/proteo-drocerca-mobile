import { useEffect } from 'react';
import { Text, View, Pressable, TouchableOpacity, Image, TextInput } from 'react-native';
import { Menu, Radio } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ChevronDownIcon } from 'react-native-heroicons/mini';
import DatePicker from 'react-native-date-picker';
import { useForm, useNavigation, usePermission, useToast } from '../../hooks';
import { blue, lightGray } from '../../utils/theme';
import { Button, Heading } from '..';
import { PermissionForm as PermissionFormInterface } from '../../ts/permissions';
import { calcPermissionTime, formatDate, formatHour } from '../../utils/dates';

interface PermissionFormProps {
  status: 'create' | 'read' | 'update' | 'approval'
}

const PermissionForm = ({ status = 'create' }: PermissionFormProps) => {
  const { createPermission, updatePermission, approvePermission, rejectPermission } = usePermission();
  const { setForm, isFetching, tiposol, finicial, hsalida, ffinal, hingreso, totald, tipomot, hcita, lugar, mot, fsolicita, pickerMode, currentPickerValue, isPickerOpen } = useForm<PermissionFormInterface>({
    isFetching: false, tiposol: '', finicial: '', hsalida: '', ffinal: '', hingreso: '', totald: '', tipomot: '', hcita: '', lugar: '', mot: '', fsolicita: new Date(), pickerMode: '', currentPickerValue: '', isPickerOpen: false
  });
  
  const permission = { tiposol, finicial, hsalida, ffinal, hingreso, totald, tipomot, hcita, lugar, mot, fsolicita };
  const navigation = useNavigation();
  const { showToast } = useToast();

  // calc permission time
  useEffect(() => {
    if (finicial && hsalida && ffinal && hingreso) {
      setForm({ totald: calcPermissionTime(finicial as Date, hsalida as Date, ffinal as Date, hingreso as Date) });
    }
  }, [finicial, hsalida, ffinal, hingreso]);

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
                  <Text className='flex-1 text-center text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3.5) }}>
                    {tiposol || ''}
                  </Text>

                  <View className='right-2'>
                    <ChevronDownIcon size={18} color={blue} strokeWidth={2} />
                  </View>
                </Pressable>
              }
            >
              {['Permiso', 'Ausencia'].map((item) => (
                <Menu.Item key={item} onPress={() => setForm({ tiposol: item })} style={{ borderBottomColor: blue }}>
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
                        setForm({ currentPickerValue: 'finicial', pickerMode: 'date', isPickerOpen: true });
                      }}
                    >
                      <Image style={{ width: wp(5), height: wp(5) }} resizeMode='cover'
                        source={require('../../assets/calendar.png')}
                      />
                      <Text className='pl-2 text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
                        {formatDate(finicial as Date) || 'dd-mm-aaaa'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Heading text='Hora' size='sm' />
                  <View className='items-center justify-center rounded-lg bg-light-gray'
                    style={{ height: wp(7), width: wp(13) }} 
                  >
                    <TouchableOpacity onPress={() => {
                      setForm({ currentPickerValue: 'hsalida', pickerMode: 'time', isPickerOpen: true });
                    }}>
                      <Text className='text-center text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
                        {formatHour(hsalida as Date) || 'hh-mm'}
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
                    <TouchableOpacity className='flex-row items-center'
                      onPress={() => {
                        setForm({ currentPickerValue: 'ffinal', pickerMode: 'date', isPickerOpen: true });
                      }}
                    >
                      <Image style={{ width: wp(5), height: wp(5) }} resizeMode='cover'
                        source={require('../../assets/calendar.png')}
                      />
                      <Text className='pl-2 text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
                        {formatDate(ffinal as Date) || 'dd-mm-aaaa'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Heading text='Hora' size='sm' />
                  <View className='items-center justify-center rounded-lg bg-light-gray'
                    style={{ height: wp(7), width: wp(13) }} 
                  >
                    <TouchableOpacity onPress={() => {
                      setForm({ currentPickerValue: 'hingreso', pickerMode: 'time', isPickerOpen: true });
                    }}>
                      <Text className='text-center text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
                        {formatHour(hingreso as Date) || 'hh-mm'}
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
                  onChange={item => setForm({ tipomot: item })}
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
                  <TouchableOpacity onPress={() => {
                    setForm({ currentPickerValue: 'hcita', pickerMode: 'time', isPickerOpen: true });
                  }}>
                    <Text className='text-center text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
                      {formatHour(hcita as Date) || 'hh-mm'}
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
              onChangeText={(text) => setForm({ lugar: text })}
              selectionColor={blue}
            />
          </View>

          {/* description */}
          <View>
            <Heading text='Descripción del motivo:' size='lg' />
            <TextInput className='w-full px-2 rounded-lg text-typography bg-light-gray'
              style={{ minHeight: wp(12), maxHeight: wp(18), fontFamily: 'Poppins-Regular', fontSize: wp(3) }}
              value={mot}
              onChangeText={(text) => setForm({ mot: text })}
              selectionColor={blue}
              multiline={true}
            />
          </View>

        </View>
      </View>
      
      {/* buttons */}
      <View className='flex-1 justify-end px-3 pb-3'>
        <Button 
          onPress={async () => {
            setForm({ isFetching: true });
            try {
              await createPermission(permission);
              showToast('Solicitud realizada');
              navigation.goBack();
            } catch (error) {
              showToast('Hubo un error creando el permiso');
            } finally {
              setForm({ isFetching: false });
            }
          }} 
          width={100} 
          text='Realizar Solicitud' 
          isLoading={isFetching}
        />
      </View>

      {/* picker */}
      <DatePicker
        modal
        mode={pickerMode as 'date' | 'time'}
        open={isPickerOpen}
        date={new Date()}
        onConfirm={date => {
          setForm({ 
            [currentPickerValue as 'finicial' | 'hsalida' | 'ffinal' | 'hingreso' | 'hcita']: date as Date,
            isPickerOpen: false 
          });
        }}
        onCancel={() => setForm({ isPickerOpen: false })}
      />
    </>
  );
};

export default PermissionForm;