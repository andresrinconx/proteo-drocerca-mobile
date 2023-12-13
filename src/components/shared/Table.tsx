import { useState, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { background, gray, lightGray } from '../../utils/theme';
import { tableTranslations } from '../../utils/constants';
import { TableProps } from '../../ts/table';
import { useDimensions } from '../../hooks';
import { Modal } from '..';

const SkeletonRow = () => (
  <View className='flex-row items-center my-1.5'>
    <View className='w-[11%] h-4 mr-2 rounded-lg bg-light-blue' />
    <View className='flex-1 h-4 mr-2 rounded-lg bg-light-blue' />
    <View className='w-[20%] h-4 mr-2 rounded-lg bg-light-blue' />
    <View className='w-[30%] h-4 rounded-lg bg-light-blue' />
  </View>
);

const Table = <T,>({ columns, data, noRecordsMessage, showHeader = true, isLoading, showSearch, minHeight, maxHeight, iconSearch, onSearch, renderItem }: TableProps<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchedElement, setSearchedElement] = useState<T | null>(null);

  const { wp } = useDimensions();
  const separation = 8;

  return (
    <ScrollView horizontal={true}>
      <View>

        {/* table header */}
        <View className='flex-row' style={{ marginHorizontal: separation }}>
          {columns.map(({ name, width }, index) => {
            const isLast = index === columns.length - 1;

            return (
              <View key={index} className='flex-row items-center justify-center rounded-t-lg bg-blue' 
                style={{ 
                  width: wp(width), 
                  height: showHeader ? 'auto' : 0,
                  marginRight: isLast ? 0 : separation 
                }}
              >
                <Text className='text-white' numberOfLines={1}
                  style={{ 
                    fontFamily: 'Poppins-Regular',
                    fontSize: 10
                  }}
                >
                  {(tableTranslations as any)[name] || name}
                </Text>
              </View>
            );
          })}
        </View>

        {/* table body */}
        {isLoading ? (
          <View className='mt-1'>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </View>
        ) : (
          data.length === 0 ? (
            <View className='h-10 justify-center items-center rounded-xl' style={{ paddingHorizontal: separation, backgroundColor: lightGray }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12 }}>
                {noRecordsMessage}
              </Text>
            </View>
          ) : (
            data.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === data.length - 1;
              const isPair = index % 2 !== 0;

              return (
                <View key={index} className='h-10 flex-row items-center justify-end'
                  style={{ 
                    backgroundColor: isPair ? background : lightGray,
                    paddingHorizontal: separation,
                    borderTopRightRadius: isFirst ? 12 : 0,
                    borderBottomRightRadius: isLast ? 12 : 0,
                    borderTopLeftRadius: isFirst ? 12 : 0,
                    borderBottomLeftRadius: isLast ? 12 : 0,
                  }}
                >
                  {columns.map(({ width, name, type, options }, index) => {
                    const itemName = item[name] as string;
                    const isLast = index === columns.length - 1;

                    return (
                      <Fragment key={index}>
                        {type === 'currency'
                          ? (
                            <View className='h-full items-center justify-center' 
                              style={{ 
                                width: wp(width), 
                                marginRight: isLast && !showSearch ? 0 : separation 
                              }}
                            >
                              <Text className='text-center' style={{ fontFamily: 'Poppins-Regular', fontSize: 10.4 }} numberOfLines={2}>
                                {options.currency} {itemName}
                              </Text>
                            </View>
                          ) 
                        : type === 'status'
                          ? (
                            <View className='h-full items-center justify-center' 
                              style={{ 
                                width: wp(width), 
                                marginRight: isLast && !showSearch ? 0 : separation,
                              }}
                            >
                              <Text className='w-full rounded-xl text-center'
                                style={{ 
                                  backgroundColor: options?.find(item => item.value === itemName)?.bgColor || gray,
                                  color: options?.find(item => item.value === itemName)?.color || 'white', 
                                  fontFamily: 'Poppins-Regular', 
                                  fontSize: 10.4 
                                }} 
                              >
                                {itemName}
                              </Text>
                            </View>
                          )
                        : (
                          <View className='h-full items-center justify-center' 
                            style={{ 
                              width: wp(width), 
                              marginRight: isLast && !showSearch ? 0 : separation 
                            }}
                          >
                            <Text className='text-center' style={{ fontFamily: 'Poppins-Regular', fontSize: 10.4 }} numberOfLines={2}>
                              {itemName}
                            </Text>
                          </View>
                        )}
                      </Fragment>
                    );
                  })}

                  {showSearch && (
                    <TouchableOpacity className='h-full items-center justify-center bg-blue'
                      onPress={() => {
                        setSearchedElement(item);
                        if (onSearch) {
                          onSearch(item);
                          return;
                        }
                        setIsModalOpen(true);
                      }}
                      style={{ 
                        width: wp(14),
                        marginRight: -separation,
                        borderBottomWidth: 0.3,
                        borderBottomColor: 'white',
                        borderTopRightRadius: isFirst ? 12 : 0,
                        borderBottomRightRadius: isLast ? 12 : 0,
                      }}
                    >
                      <Image style={{ width: 24, height: 24 }} resizeMode='cover'
                        source={iconSearch || require('../../assets/search.png')}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          )
        )}

        {/* search */}
        <Modal 
          bgColor={background} 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen}
          minHeight={minHeight || 50}
          maxHeight={maxHeight || 140}
        >
          {renderItem ? renderItem(searchedElement as T) : <></>}
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Table;