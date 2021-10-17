import React, { useState, useMemo, useCallback } from 'react';

import { TouchableOpacity } from 'react-native';

import {
  Radio,
  RadioGroup,
  Text,
  Input,
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  IndexPath,
  Datepicker,
} from '@ui-kitten/components';

import { verifyWithoutCaption } from 'src/utilities/FormVerification';

import { IconEye, IconInputState } from 'src/components/CustomIcons';

const CAPTION_ICON = {
  basic: 'alert-circle-outline',
  success: 'checkmark-circle-outline',
  danger: 'alert-triangle-outline',
};

const CaptionIcon = (props) => {
  const { icon, ...otherProps } = props;

  return <IconInputState {...otherProps} iconType={CAPTION_ICON[icon]} />;
};

const SecureToggleIcon = (props) => {
  const { isSecure, toggleSecure, ...otherProps } = props;

  const handlePress = () => {
    toggleSecure((prevState) => !prevState);
  };

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={handlePress}>
      <IconEye {...otherProps} isClosed={isSecure} />
    </TouchableOpacity>
  );
};

export const GeneralTextField = (props) => {
  const {
    label,
    placeholder,
    type,
    caption,
    size,
    validate,
    setFormValues,
    secure,
    value,
    status,
    accessoryRight,
    ...otherProps
  } = props;

  const [inputVal, setInputVal] = useState({
    value: 'value',
    status: status ?? 'basic',
  });

  const [isSecureEntry, setSecureEntry] = useState(secure);

  const handleChange = useCallback(
    (input) => {
      // console.log(input);
      const currentState = verifyWithoutCaption(input, validate);

      setInputVal((prevState) => ({
        ...prevState,
        ...currentState,
        value: input,
      }));

      try {
        setFormValues((prevState) => ({ ...prevState, [type]: input }));
      } catch (e) {
        console.log(e);
      }
    },
    [validate],
  );

  const handleChangeNoValidate = useCallback((input) => {
    setInputVal((prevState) => ({
      ...prevState,
      value: input,
    }));
  }, []);

  const handleBlur = useCallback(() => {
    setFormValues((prevState) => ({ ...prevState, [type]: inputVal.value }));
  }, [inputVal.value, setFormValues, type]);

  return useMemo(
    () => (
      <Input
        {...otherProps}
        scrollEnabled
        accessibilityLiveRegion="polite"
        maxFontSizeMultiplier={1.5}
        autoCorrect={false}
        autoCapitalize={'none'}
        size={size || 'large'}
        caption={caption}
        value
        label={label ?? null}
        // label={label ? `${label} ${validate ? '*' : ''}` : null}
        secureTextEntry={isSecureEntry}
        accessibilityLabel={label}
        placeholder={placeholder || label}
        status={inputVal.status}
        onChangeText={validate ? handleChange : handleChangeNoValidate}
        onBlur={handleBlur}
        /* prettier-ignore */
        accessoryRight={
          secure
            ? (evaProps) => (
              <SecureToggleIcon
                {...evaProps}
                isSecure={isSecureEntry}
                toggleSecure={setSecureEntry}
              />
            )
            : accessoryRight
        }
        /* prettier-ignore */
        captionIcon={(evaProps) => (
          caption ? <CaptionIcon {...evaProps} icon={inputVal.status} /> : null
        )}
      />
    ),
    [
      inputVal,
      label,
      caption,
      size,
      secure,
      otherProps,
      handleChange,
      handleChangeNoValidate,
      handleBlur,
      isSecureEntry,
      validate,
      placeholder,
    ],
  );
};

export const GeneralRadioGroup = (props) => {
  // prettier-ignore
  const {
    label, data, type, setFormValues,
  } = props;

  const [selectedOption, setSelectedOption] = useState(0);

  const handleChange = useCallback(
    (index) => {
      setSelectedOption(index);
      setFormValues((prevState) => ({
        ...prevState,
        [type]: data[index],
      }));
    },
    [setFormValues, type, data],
  );

  return useMemo(
    () => (
      <>
        <Text category="label" appearance="hint">
          {label}
        </Text>
        <RadioGroup selectedIndex={selectedOption} onChange={handleChange}>
          {data.map((option) => (
            <Radio key={option}>{option}</Radio>
          ))}
        </RadioGroup>
      </>
    ),
    [data, handleChange, label, selectedOption],
  );
};

export const GeneralAutocomplete = (props) => {
  // prettier-ignore
  const {
    label, data, type, setFormValues,
  } = props;

  const [value, setValue] = useState('');

  const [list, setList] = useState(data);

  // prettier-ignore
  const filterData = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

  const handleChange = useCallback(
    (query) => {
      setValue(query);
      setList(() => data.filter((item) => filterData(item, query)));
    },
    [data],
  );

  const handleSelect = useCallback(
    (index) => {
      setValue(data[index].title);
      setFormValues((prevState) => ({
        ...prevState,
        [type]: data[index].title,
      }));
    },
    [setFormValues, type, data],
  );

  const renderOption = (item, index) => (
    <AutocompleteItem key={index} title={item.title} />
  );

  return useMemo(
    () => (
      <Autocomplete
        label={label}
        placement="top start"
        size="large"
        placeholder={label}
        value={value}
        onSelect={handleSelect}
        onChangeText={handleChange}
      >
        {list.map(renderOption)}
      </Autocomplete>
    ),
    [handleChange, handleSelect, label, list, value],
  );
};

export const GeneralSelect = (props) => {
  // prettier-ignore
  const {
    label, data, type, size, setFormValues, placeholder
  } = props;

  const [selectedOption, setSelectedOption] = useState(new IndexPath(0));

  const handleSelect = useCallback(
    (index) => {
      setSelectedOption(index);
      setFormValues((prevState) => ({
        ...prevState,
        [type]: data[index.row].title,
      }));
    },
    [setFormValues, type, data],
  );

  const renderOption = useMemo(
    () => <Text>{data[selectedOption.row].title}</Text>,
    [data, selectedOption.row],
  );

  return useMemo(
    () => (
      <Select
        size={size || 'large'}
        label={label}
        value={renderOption}
        selectedIndex={selectedOption}
        onSelect={handleSelect}
      >
        {data.map((option) => (
          <SelectItem key={option.title} title={option.title} />
        ))}
      </Select>
    ),
    [data, handleSelect, label, size, selectedOption, renderOption],
  );
};

export const GeneralDatePicker = (props) => {
  // prettier-ignore
  const {
    label, type, size, setFormValues, ...otherProps
  } = props;

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelect = useCallback(
    (newData) => {
      setSelectedDate(newData);
      setFormValues((prevState) => ({
        ...prevState,
        [type]: selectedDate.toLocaleDateString(),
      }));
    },
    [setFormValues, type, selectedDate],
  );

  return useMemo(
    () => (
      <Datepicker
        {...otherProps}
        size={size || 'large'}
        label={label}

        date={selectedDate}
        onSelect={handleSelect}
        min={new Date('12-05-1880')}
        max={new Date()}
      />
    ),
    [handleSelect, label, size, selectedDate, otherProps],
  );
};
