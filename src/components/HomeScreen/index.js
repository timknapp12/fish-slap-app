import React, { useState, useRef, useEffect, useContext } from "react";
import {
  TouchableWithoutFeedback,
  Vibration,
  Animated,
  Easing,
} from "react-native";
import styled from "styled-components/native";
import {
  ScreenContainer,
  GeneralContainer,
  MainText,
  SecondaryText,
} from "../common";
import HamburgerMenu from "./HamburgerMenu";
import logoLeft from "../../assets/fish-slap-icon-tail-left.png";
import logoRight from "../../assets/fish-slap-icon-tail-right.png";
import AppContext from "../../utils/AppContext";

const Logo = styled.Image`
  height: 200px;
  width: 200px;
`;

const DivisionLine = styled.View`
  height: 1px;
  width: 100%;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.color};
  margin: 12px 0px;
`;

const HomeScreen = () => {
  const { user } = useContext(AppContext);
  const [isLogoLeft, setIsLogoLeft] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const initialWelcome = user?.username
    ? `What up ${user.username}?`
    : "What up?";
  const [welcome, setWelcome] = useState(initialWelcome);

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

  useEffect(() => {
    setWelcome(user?.username ? user.username : "Fish Slap App");
    return () => {
      setWelcome(initialWelcome);
    };
  }, [user]);

  const scaleText = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1.2],
  });
  const spinText = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });
  const logoAnimation = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 80],
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
          <Animated.View
            style={{
              width: "60%",
              transform: [{ scale: scaleText }],
            }}
          >
            <MainText style={{ textAlign: "center" }}>{welcome}</MainText>
          </Animated.View>
          <DivisionLine />
          <Animated.View style={{ transform: [{ rotate: spinText }] }}>
            <SecondaryText style={{ textAlign: "center" }}>
              Send and receive digital gestures!
            </SecondaryText>
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
            <SecondaryText>
              {user?.username ? `${user.username}!` : ""}
            </SecondaryText>
            <SecondaryText>
              {user?.username ? `${user.username}!` : ""}
            </SecondaryText>
            <SecondaryText>
              {user?.username ? `${user.username}!` : ""}
            </SecondaryText>
            <SecondaryText>
              {user?.username ? `${user.username}!` : ""}
            </SecondaryText>
            <SecondaryText>
              {user?.username ? `${user.username}!` : ""}
            </SecondaryText>
            <SecondaryText>
              Welcome {user?.username ? `${user.username}!` : ""}
            </SecondaryText>
            <SecondaryText>Send and receive digital gestures</SecondaryText>
            <SecondaryText>
              {user?.username ? `${user.username}!` : ""}
            </SecondaryText>
            <SecondaryText>
              {user?.username ? `${user.username}!` : ""}
            </SecondaryText>
          </Animated.View>
        </GeneralContainer>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};
export default HomeScreen;
