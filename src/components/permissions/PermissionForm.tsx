import { useEffect } from 'react';
import { Text, View, Pressable, TouchableOpacity, Image, TextInput } from 'react-native';
import { Menu, Radio } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ChevronDownIcon } from 'react-native-heroicons/mini';
import DatePicker from 'react-native-date-picker';
import { useAuth, useForm, useNavigation, usePermission, useToast } from '../../hooks';
import { blue, lightGray } from '../../utils/theme';
import { PermissionForm as PermissionFormInterface, PermissionFormProps } from '../../ts/permissions';
import { calcPermissionTime, formatDate, formatHour } from '../../utils/dates';
import { fetchApprovePermission, fetchPermission, fetchRejectPermission } from '../../utils/api';
import { capitalizeEveryWord } from '../../utils/strings';
import { Button, Heading, Loader } from '..';
import { socket } from '../../helpers/socket';

const PermissionForm = ({ status, id }: PermissionFormProps) => {
  const { savePermission } = usePermission();
  const { setForm, isGettingPermission, isRequesting, isRejecting, tiposol, finicial, hsalida, ffinal, hingreso, totald, tipomot, hcita, lugar, mot, fsolicita, pickerMode, name, status: permisisonStatus, currentPickerValue, isPickerOpen } = useForm<PermissionFormInterface>({
    isGettingPermission: false, isRequesting: false, isRejecting: false, tiposol: '', finicial: '', hsalida: '', ffinal: '', hingreso: '', totald: '', tipomot: '', hcita: '', lugar: '', mot: '', fsolicita: new Date(), pickerMode: '', name: '', status: '', currentPickerValue: '', isPickerOpen: false
  });
  
  const { auth: { isHRBoss } } = useAuth();
  const navigation = useNavigation();
  const { showToast } = useToast();

  const approval = status === 'approval';
  const update = status === 'update';
  const create = status === 'create';
  const permission = { tiposol, finicial, hsalida, ffinal, hingreso, totald, tipomot, hcita, lugar, mot, fsolicita };

  // get item if exists
  useEffect(() => {
    const getPermission = async () => {
      try {
        setForm({ isGettingPermission: true });
        const { tiposol, finicial, hsalida, ffinal, hingreso, totald, tipomot, hcita, lugar, mot, fsolicita, name, status } = await fetchPermission(id as string);
        setForm({ isGettingPermission: false, tiposol, finicial: new Date(finicial), hsalida, ffinal: new Date(ffinal), hingreso, totald, tipomot, hcita, lugar, mot, fsolicita: new Date(fsolicita), name, status });
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      getPermission();
    }
  }, []);

  // calc permission time
  useEffect(() => {
    if (finicial && hsalida && ffinal && hingreso) {
      setForm({ totald: calcPermissionTime(finicial as Date, hsalida as Date, ffinal as Date, hingreso as Date) });
    }
  }, [finicial, hsalida, ffinal, hingreso]);

  return (
    <>
      {!create && (!id || isGettingPermission) ? (
        <View className='pt-10'>
          <Loader color={blue} size={35} />
        </View>
      ) : (
        <>
          {/* form */}
          <View className='mt-5 px-3 space-y-5'>
    
            {/* user */}
            {approval && (
              <View>
                <Heading text='Usuario:' size='xl' />
                <Text className='text-typography' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(4) }}>
                  {capitalizeEveryWord(name) || ''}
                </Text>
              </View>
            )}
    
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
                        {tiposol === 'A' ? 'Ausencia' : tiposol === 'P' ? 'Permiso' : ''}
                      </Text>
    
                      <View className='right-2'>
                        <ChevronDownIcon size={18} color={blue} strokeWidth={2} />
                      </View>
                    </Pressable>
                  }
                >
                  {(approval ? [] : ['Permiso', 'Ausencia']).map((item) => (
                    <Menu.Item key={item} onPress={() => setForm({ tiposol: item.substring(0, 1) })} style={{ borderBottomColor: blue }}>
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
                          onPress={() => approval ? null : setForm({ currentPickerValue: 'finicial', pickerMode: 'date', isPickerOpen: true })}
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
                        <TouchableOpacity onPress={() => approval ? null : setForm({ currentPickerValue: 'hsalida', pickerMode: 'time', isPickerOpen: true })}>
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
                          onPress={() => approval ? null : setForm({ currentPickerValue: 'ffinal', pickerMode: 'date', isPickerOpen: true })}
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
                        <TouchableOpacity onPress={() => approval ? null : setForm({ currentPickerValue: 'hingreso', pickerMode: 'time', isPickerOpen: true })}>
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
                      onChange={item => approval ? null : setForm({ tipomot: item })}
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
                      <TouchableOpacity onPress={() => approval ? null : setForm({ currentPickerValue: 'hcita', pickerMode: 'time', isPickerOpen: true })}>
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
                  editable={approval ? false : true}
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
                  editable={approval ? false : true}
                />
              </View>
    
            </View>
          </View>
          
          {/* buttons */}
          <View className='flex-1 justify-end px-3 py-3'>
            {!approval ? (
              <Button 
                onPress={async () => {
                  setForm({ isRequesting: true });
                  try {
                    await savePermission(permission, id as string);
                    showToast(create ? 'Solicitud realizada' : 'Solicitud actualizada');
                    navigation.goBack();
                  } catch (error) {
                    showToast((error as Error).message);
                  } finally {
                    setForm({ isRequesting: false });
                  }
                }} 
                width={100} 
                text={create ? 'Realizar Solicitud' : permisisonStatus !== 'Por aprobar' ? `${permisisonStatus}` : 'Actualizar Solicitud'} 
                disabled={permisisonStatus !== 'Por aprobar' && update}
                opacity={permisisonStatus !== 'Por aprobar' && update ? 0.8 : 1}
                isLoading={isRequesting}
              />
            ) : (
              isHRBoss ? (
                permisisonStatus !== 'Por aprobar' ? (
                  <Button
                    onPress={() => null}
                    width={100} 
                    text={permisisonStatus}
                    disabled={true}
                    opacity={0.8}
                    isLoading={isRequesting}
                  />
                ) : (
                  <View className='flex-row items-center justify-between'>

                    {/* Reject */}
                    <Button
                      onPress={async () => {
                        setForm({ isRejecting: true });
                        try {
                          await fetchRejectPermission({ id: id as string });
                          socket.emit('response permission', { id: id as string, status: 'Rechazado' });

                          showToast('Solicitud rechazada');
                          navigation.goBack();
                        } catch (error) {
                          showToast((error as Error).message);
                        } finally {
                          setForm({ isRejecting: false });
                        }
                      }} 
                      width={49} 
                      text={permisisonStatus !== 'Por aprobar' ? 'Rechazada' : 'Rechazar'}
                      disabled={permisisonStatus !== 'Por aprobar'}
                      opacity={permisisonStatus !== 'Por aprobar' ? 0.6 : 1}
                      isLoading={isRejecting}
                    />

                    {/* Approve */}
                    <Button
                      onPress={async () => {
                        setForm({ isRequesting: true });
                        try {
                          await fetchApprovePermission({ id: id as string });
                          socket.emit('response permission', { id: id as string, status: 'Aprobado' }); 

                          showToast('Solicitud aprobada');
                          navigation.goBack();
                        } catch (error) {
                          showToast((error as Error).message);
                        } finally {
                          setForm({ isRequesting: false });
                        }
                      }} 
                      width={49} 
                      text={permisisonStatus !== 'Por aprobar' ? 'Aprobada' : 'Aprobar'}
                      disabled={permisisonStatus !== 'Por aprobar'}
                      opacity={permisisonStatus !== 'Por aprobar' ? 0.8 : 1}
                      isLoading={isRequesting}
                    />
                  </View>
                )
              ) : (
                <Button
                  onPress={async () => {
                    setForm({ isRequesting: true });
                    try {
                      const permissionToBoss = await fetchApprovePermission({ id: id as string });
                      socket.emit('new permission', permissionToBoss);
                      
                      showToast('Solicitud aprobada');
                      navigation.goBack();
                    } catch (error) {
                      showToast((error as Error).message);
                    } finally {
                      setForm({ isRequesting: false });
                    }
                  }} 
                  width={100} 
                  text={permisisonStatus !== 'Por aprobar' ? 'Solicitud aprobada' : 'Aprobar Solicitud'}
                  disabled={permisisonStatus !== 'Por aprobar'}
                  opacity={permisisonStatus !== 'Por aprobar' ? 0.8 : 1}
                  isLoading={isRequesting}
                />
              )
            )}
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
      )}
    </>
  );
};

export default PermissionForm;