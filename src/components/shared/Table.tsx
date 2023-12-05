import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { background, lightGray } from '../../utils/theme';
import { tableTranslations } from '../../utils/constants';
import { getCurrency } from '../../utils/strings';
import Modal from './Modal';

type Column<T> = {
  name: Extract<keyof T, string>;
  width: number;
  isCurrency?: boolean;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  currency?: string;
  showHeader?: boolean;
  showSearch: true;
  renderItem: (item: T) => React.JSX.Element;
} | {
  columns: Column<T>[];
  data: T[];
  currency?: string;
  showHeader?: boolean;
  showSearch?: false;
  renderItem?: never;
};

const Table = <T,>({ columns, data, currency, showHeader = true, showSearch, renderItem }: TableProps<T>) => {
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
            No hay registros para este mes
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
              {columns.map(({ name, width, isCurrency }, index) => {
                return (
                  <Text key={index} className='mx-1 text-center'
                    style={{ 
                      width: wp(width),
                      fontFamily: 'Poppins-Regular',
                      fontSize: wp(3),
                    }}
                  >
                    {isCurrency ? getCurrency(currency as string, item[name] as string) : item[name] as string}
                  </Text>
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