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

  // Animations for welcome, username, and fish logo
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const animatedValue3 = useRef(new Animated.Value(0)).current;
  const animatedValue4 = useRef(new Animated.Value(0)).current;

  const animate = () => {
    animatedValue1.setValue(0);
    animatedValue2.setValue(0);
    animatedValue3.setValue(0);
    animatedValue4.setValue(0);
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
      createAnimation(animatedValue4, 1000, Easing.ease, 6000),
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
  const logoAnimation = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 60],
  });

  const moveUp = animatedValue4.interpolate({
    inputRange: [0, 1],
    outputRange: [220, 12],
  });

  const logoDisappear = () => {
    Animated.timing(animatedValue3, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => setIsLogoVisible(false));
  };

  // FADE OUT FOR HAMBURGER MENU - Fade in method is declared in HamburgerMenu.js
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in .5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setIsMenuOpen(false));
  };

  return (
    <ScreenContainer>
      <TouchableWithoutFeedback onPress={fadeOut}>
        <GeneralContainer height="100%" justify="flex-start">
          <HamburgerMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            setIsLogoLeft={setIsLogoLeft}
            fadeAnim={fadeAnim}
            fadeOut={fadeOut}
          />
          <TouchableWithoutFeedback
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            <Animated.View style={{ transform: [{ scale: scaleText }] }}>
              <MainText>Welcome</MainText>
            </Animated.View>
          </TouchableWithoutFeedback>

          <Animated.View
            style={{ marginTop: 8, transform: [{ rotate: spinText }] }}
          >
            <MainText style={{ fontSize: 20 }}>
              {user?.username ? `${user.username}!` : ""}
            </MainText>
          </Animated.View>

          {isLogoVisible && (
            <Animated.View style={{ top: logoAnimation, position: "absolute" }}>
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

          <Animated.View style={{ marginTop: moveUp }}>
            <MainText>This is more stuff in the app</MainText>
            <MainText>This is more stuff in the app</MainText>
            <MainText>This is more stuff in the app</MainText>
          </Animated.View>
        </GeneralContainer>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};
export default HomeScreen;
