import React, { useState } from 'react';
import {
  IndexPath,
  Layout,
  Text,
  Select,
  SelectItem,
  Button,
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';

const PaymentSchedule = (props) => {
  const { amount, scheme, interestRate, title, slug } = props.route.params;
  const [numOfDays, setNumOfDays] = useState(30);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  let price = amount;
  let rate = interestRate / 100;
  const onChange = (min, max) => {
    console.log('min: ', min);
    console.log('max: ', max);
    const diff = max - min;
    setNumOfDays(diff + 30);
  };

  const data = [
    '1 month',
    '2 months',
    '3 months',
    '4 months',
    '5 months',
    '6 months',
    '7 months',
    '8 months',
    '9 months',
    '10 months',
    '11 months',
    '12 months',
  ];
  const numOfMonths = selectedIndex.row + 1;
  // Interest per 30 days
  let interestPer30days = price * rate;
  // Interesr per days chosen;
  let interest = numOfMonths * interestPer30days;
  const total = interest + price;
  const displayValue = data[selectedIndex.row];
  const renderOption = (title) => <SelectItem title={title} />;
  const calculateTotal = (index) => {
    setSelectedIndex(index);
  };
  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`Payment Schedule`}
        navigation={props.navigation}
        screen="auth"
      />
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.textStyle}>{title}</Text>
          <Text style={styles.textStyle}>Loan Amount: ₦{price}.00</Text>
          <Text style={styles.textStyle}>
            Loan Repayment at {interestRate}% rate per month
          </Text>
        </View>
        <Text style={styles.opacity}>Number of months ({numOfMonths})</Text>
        <View style={{ marginVertical: 15 }}>
          <Select
            style={styles.select}
            placeholder="Default"
            value={displayValue}
            selectedIndex={selectedIndex}
            onSelect={(index) => calculateTotal(index)}
          >
            {data.map(renderOption)}
          </Select>
        </View>
        {/* <View style= {{ paddingHorizontal: 20}}>
                <RangeSlider
                type="range" // ios only
                suffix= " Days"
                minLabelColor="#FF5757"
                maxLabelColor= "#FF5757"
                step={30}
                min={30}
                max={360}
                tintColor="#FF5757"
                handleColor="#043F7C"
                handlePressedColor="#FF5757"
                tintColorBetweenHandles="#043F7C"
                onChange={onChange}
            />
            </View> */}
        <View style={styles.flexContainer}>
          <Text style={styles.opacity}>Total Amount to be paid</Text>
          <Text category="h5">₦{total}.00</Text>
        </View>
        <View style={{ marginVertical: 25 }}>
          <Button
            status="danger"
            onPress={() =>
              props.navigation.navigate('WoozeePaySummary', {
                title: title,
                total: total,
                numberOfDays: numOfMonths,
                amount: amount,
                rate: interestRate,
                scheme: scheme,
                slug: slug,
              })
            }
          >
            <Text status="control" category="h6">
              Proceed to Summary
            </Text>
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  flexContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  opacity: {
    opacity: 0.5,
  },
  wrapper: {
    marginBottom: 15,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default PaymentSchedule;
