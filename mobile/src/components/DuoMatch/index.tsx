import React from "react";
import { Modal, ModalProps, View, Text } from "react-native";

import { styles } from "./styles";

interface Props extends ModalProps {
  discord: string;
}

export function DuoMatch({ discord, ...rest }: Props) {
  return (
    <Modal {...rest}>
      <View style={styles.container}>
        <Text style={styles.discord}>{discord}</Text>
      </View>
    </Modal>
  );
}
