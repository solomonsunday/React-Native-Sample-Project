import React, { useMemo } from 'react';

import { View } from 'react-native';

// prettier-ignore
const Media = () => useMemo(
  () => (
    <View style={{ padding: 5 }}>
      <View style={{
        height: 50, width: 50, borderRadius: 5, backgroundColor: 'rgba(143,155,179, 0.08)',
      }}
      />
    </View>
  ),
  [],
);

// prettier-ignore
const Line = ({ height, width }) => useMemo(
  () => (
    <View style={{ padding: 5 }}>
      <View style={{
        height, width, borderRadius: 5, backgroundColor: 'rgba(143,155,179, 0.08)',
      }}
      />
    </View>
  ),
  [height, width],
);

export default function Placeholders(props) {
  const {
    mediaLeft,
    mediaRight,
    mediaCenter,
    row,
    count,
    numColumns,
    maxHeight,
    maxWidth,
    paragraph,
    numLines,
  } = props;

  const direction = row ? 'row' : 'column';

  const width = maxWidth / (numColumns || 1);

  const linesHeight = maxHeight / (numLines || 3) / 1.5;

  const ParagraphLines = useMemo(
    () => (
      <>
        {Array.from(Array(numLines).keys()).map((item) => (
          <Line height={linesHeight} width={`${100 - item * 10}%`} key={item} />
        ))}
      </>
    ),
    [numLines, linesHeight],
  );

  const MediaLines = useMemo(
    () => (
      <>
        <Line height={maxHeight - 25} width="100%" />
        <Line height={25} width="80%" />
      </>
    ),
    [maxHeight],
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: direction,
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      {Array.from(Array(count).keys()).map((item) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingVertical: 10,
            paddingHorizontal: 5,
            width,
            height: maxHeight + 20,
          }}
          key={item}
        >
          {mediaLeft ? <Media /> : null}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {mediaCenter ? <Media /> : null}
            {paragraph ? ParagraphLines : MediaLines}
          </View>
          {mediaRight ? <Media /> : null}
        </View>
      ))}
    </View>
  );
}
