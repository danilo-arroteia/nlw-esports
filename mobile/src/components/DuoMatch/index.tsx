import { Modal, ModalProps, View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as Clipboard from 'expo-clipboard'

import { MaterialIcons } from '@expo/vector-icons'
import { styles } from "./styles";
import { THEME } from "../../theme";
import { CheckCircle } from "phosphor-react-native";
import { Header } from "../Header";
import { useState } from "react";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose,  ...rest }: Props) {
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert('Discord copiado!', 'Usuário copiado para você colar no Discord')
    setIsCopying(false);
  }
  console.log(discord)
  return (
    <Modal 
      {...rest}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons 
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle 
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Header 
            title="Let's play !"
            subTitle="Agora é só começar a jogar !"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.label}>
            Adicione no Discord
          </Text>

          <TouchableOpacity 
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopying}
          >
           <Text style={styles.discord}>
            {isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
          </Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </Modal>
  );
}
