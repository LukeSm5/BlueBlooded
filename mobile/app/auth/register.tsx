import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Button from "../../components/shared/Button"


const RegisterScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const registerAccount = async () => {

  }
  return (
    <View>
      <Button label="Register" onPress={registerAccount} />
    </View>
  )
};

export default RegisterScreen;