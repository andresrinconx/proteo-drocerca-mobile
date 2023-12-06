import { useState, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { background, gray, lightGray } from '../../utils/theme';
import { tableTranslations } from '../../utils/constants';
import { getCurrency } from '../../utils/strings';
import { TableProps } from '../../ts/table';
import { Modal } from '..';

const Table = <T,>({ columns, data, noRecordsMessage, currency, showHeader = true, showSearch, renderItem }: TableProps<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchedElement, setSearchedElement] = useState<T | null>(null);

  return (
    <View style={{ maxWidth: wp(columns.reduce((accumulator, column) => accumulator + column.width, 0) + (showSearch ? 22 : 11)) }}>

      {/* table header */}
      {showHeader && (
        <View className='flex-row mx-2'>
          {columns.map(({ name, width }, index) => {
            return (
              <View key={index} className='flex-row items-center justify-center mx-1 rounded-t-lg bg-blue'
                style={{ width: wp(width) }}
              >
                <Text className='text-[9.5px] text-white' style={{ fontFamily: 'Poppins-Regular' }} numberOfLines={1}>
                  {(tableTranslations as any)[name] || name}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      {/* table body */}
      {data.length === 0 ? (
        <View className='flex-row justify-center items-center px-2'
          style={{ 
            height: wp(10),
            backgroundColor: lightGray,
            borderTopRightRadius: wp(3),
            borderBottomRightRadius: wp(3),
            borderTopLeftRadius: wp(3),
            borderBottomLeftRadius: wp(3),
          }}
        >
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
            {noRecordsMessage}
          </Text>
        </View>
      ) : (
        data.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === data.length - 1;
          const isPair = index % 2 !== 0;

          return (
            <View key={index} className='flex-row items-center px-2'
              style={{ 
                height: wp(10),
                backgroundColor: isPair ? background : lightGray,
                borderTopRightRadius: isFirst ? wp(3) : 0,
                borderBottomRightRadius: isLast ? wp(3) : 0,
                borderTopLeftRadius: isFirst ? wp(3) : 0,
                borderBottomLeftRadius: isLast ? wp(3) : 0,
              }}
            >
              {columns.map(({ width, name, type, options }, index) => {
                const itemName = item[name] as string;

                return (
                  <Fragment key={index}>
                    {type === 'currency'
                      ? (
                        <Text className='mx-1 text-center' 
                          style={{ width: wp(width), fontFamily: 'Poppins-Regular', fontSize: wp(3) }}
                        >
                          {getCurrency(currency as string, itemName)}
                        </Text>
                      ) 
                    : type === 'status'
                      ? (
                        <Text className='mx-1 rounded-xl text-center' 
                          style={{ 
                            backgroundColor: options?.find(item => item.value === itemName)?.bgColor || gray, 
                            color: options?.find(item => item.value === itemName)?.color || 'white',
                            width: wp(width), 
                            fontFamily: 'Poppins-Regular', 
                            fontSize: wp(3) 
                          }}
                        >
                          {itemName}
                        </Text>
                      )
                    : (
                      <Text className='mx-1 text-center' style={{ width: wp(width), fontFamily: 'Poppins-Regular', fontSize: wp(3) }}>
                        {itemName}
                      </Text>
                    )}
                  </Fragment>
                );
              })}

              {showSearch && (
                <TouchableOpacity className='h-full items-center justify-center bg-blue'
                  onPress={() => {
                    setSearchedElement(item);
                    setIsModalOpen(true);
                  }}
                  style={{ 
                    width: wp(14),
                    borderBottomWidth: 0.3,
                    borderBottomColor: 'white',
                    borderTopRightRadius: isFirst ? wp(3) : 0,
                    borderBottomRightRadius: isLast ? wp(3) : 0,
                  }}
                >
                  <Image style={{ width: wp(6), height: wp(6) }} resizeMode='cover'
                    source={require('../../assets/search.png')}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        })
      )}

      {/* search */}
      <Modal 
        bgColor={background} 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen}
        minHeight={50}
        maxHeight={140}
      >
        {renderItem ? renderItem(searchedElement as T) : <></>}
      </Modal>
    </View>
  );
};

export default Table;