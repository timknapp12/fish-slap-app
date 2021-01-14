import React, { useState, useRef, useEffect, useContext } from "react";
import {
  TouchableWithoutFeedback,
  Vibration,
  Animated,
  Easing,
} from "react-native";
import styled from "styled-components/native";
import { ScreenContainer, GeneralContainer, MainText } from "../common";
import HamburgerMenu from "./HamburgerMenu";
import logoLeft from "../../assets/fish-slap-icon-tail-left.png";
import logoRight from "../../assets/fish-slap-icon-tail-right.png";
import AppContext from "../../utils/AppContext";

const Logo = styled.Image`
  height: 200px;
  width: 200px;
`;

const HomeScreen = () => {
  const { user } = useContext(AppContext);
  const [isLogoLeft, setIsLogoLeft] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(true);

  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const animatedValue3 = useRef(new Animated.Value(0)).current;

  const animate = () => {
    animatedValue1.setValue(0);
    animatedValue2.setValue(0);
    animatedValue3.setValue(0);
    const createAnimation = (value, duration, easing, delay = 0) => {
      return Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        delay,
        useNativeDriver: false,
      });
    };
    Animated.parallel([
      createAnimation(animatedValue1, 2000, Easing.ease),
      createAnimation(animatedValue2, 1000, Easing.ease, 1000),
      createAnimation(animatedValue3, 1000, Easing.ease, 2000),
    ]).start();
  };

  useEffect(() => {
    animate();
    setTimeout(() => {
      logoDisappear();
    }, 6000);
    return () => {
      setIsLogoVisible(true);
    };
  }, []);

  const scaleText = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.5],
  });
  const spinText = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });
  let logoAnimation = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 0],
  });

  const logoDisappear = () => {
    Animated.timing(animatedValue3, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => setIsLogoVisible(false));
  };

  return (
    <ScreenContainer>
      <GeneralContainer height="100%" justify="flex-start">
        <HamburgerMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setIsLogoLeft={setIsLogoLeft}
        />

        <Animated.View style={{ transform: [{ scale: scaleText }] }}>
          <MainText>Welcome</MainText>
        </Animated.View>

        <Animated.View
          style={{ marginTop: 8, transform: [{ rotate: spinText }] }}
        >
          <MainText style={{ fontSize: 20 }}>
            {user?.username ? `${user.username}!` : ""}
          </MainText>
        </Animated.View>

        {isLogoVisible && (
          <Animated.View style={{ top: logoAnimation }}>
            <TouchableWithoutFeedback
              onPress={() => {
                Vibration.vibrate();
                setIsLogoLeft((state) => !state);
              }}
            >
              <Logo source={isLogoLeft ? logoLeft : logoRight} />
            </TouchableWithoutFeedback>
          </Animated.View>
        )}
        <MainText>This is more stuff in the app</MainText>
        <MainText>This is more stuff in the app</MainText>
        <MainText>This is more stuff in the app</MainText>
      </GeneralContainer>
    </ScreenContainer>
  );
};
export default HomeScreen;
