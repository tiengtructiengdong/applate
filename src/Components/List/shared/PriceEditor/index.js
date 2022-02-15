import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Slider} from '@miblanchard/react-native-slider';
import {useDispatch} from 'react-redux';

const Container = styled.View`
  flex: 1;
  width: 100%;
`;
const ScrollArea = styled.ScrollView`
  padding-top: 10px;
`;
const Space = styled.View`
  height: 30px;
`;
const HorizArea = styled.View`
  flex-direction: row;
  height: 30px;
  margin-horizontal: 30px;
`;
const VertArea = styled.View`
  width: 30px;
  margin-top: -7px;
  margin-bottom: -30px;
`;
const Label = styled.Text`
  font-size: 13px;
  color: #808080;
  flex: 1;
  text-align: center;
  align-self: center;
`;
const VertLabel = styled(Label)`
  text-align: right;
  align-self: flex-end;
  margin-right: 5px;
  overflow: visible;
`;
const RowArea = styled.View`
  flex: 1;
  flex-direction: row;
  margin-bottom: 0.5px;
`;
const Area = styled.View`
  flex: 1;
`;
const Cell = styled.View`
  flex: 1;
  height: 36px;
  background-color: #424242;
  margin: 0.5px;
`;
const ScrollbarArea = styled.View`
  width: 500px;
  align-items: stretch;
  align-self: center;
  top: 240px;
  margin-left: 6px;
`;

const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hour = [...Array(24).keys()];

export function PriceEditor({}) {
  const scrollRef = useRef();
  const [scrollVal, setScrollVal] = useState(0.39);
  const dispatch = useDispatch();

  const [sizeX, setSizeX] = useState(0);
  const [sizeY, setSizeY] = useState(0);

  useEffect(() => {
    scrollRef?.current.scrollTo({
      y: (sizeY * 0.61) / 2.2,
      animated: false,
    });
  }, [dispatch, sizeY]);

  const scrollTo = val => {
    setScrollVal(val);
    if (sizeY > 0) {
      scrollRef?.current.scrollTo({
        y: (sizeY * (1 - val)) / 2.2,
        animated: false,
      });
    }
  };

  return (
    <Container>
      <HorizArea>
        {day.map(d => (
          <Label key={`horiz_${d}`}>{d}</Label>
        ))}
      </HorizArea>
      <RowArea>
        <ScrollArea
          ref={scrollRef}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(w, h) => {
            setSizeX(w);
            setSizeY(h);
          }}
          scrollEnabled={false}>
          <RowArea>
            <VertArea>
              {hour.map(h => (
                <VertLabel key={`vert_${h}`}>{h % 24}h</VertLabel>
              ))}
              <VertLabel>0h</VertLabel>
            </VertArea>
            <Area>
              {hour.map(h => (
                <RowArea key={`row_${h}`}>
                  {day.map(d => (
                    <Cell key={`cell_${d}_${h}`} />
                  ))}
                </RowArea>
              ))}
            </Area>
          </RowArea>
          <Space />
        </ScrollArea>

        <VertArea>
          <ScrollbarArea>
            <Slider value={scrollVal} vertical onValueChange={scrollTo} />
          </ScrollbarArea>
        </VertArea>
      </RowArea>
    </Container>
  );
}
