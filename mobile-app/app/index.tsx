import { Text, View ,SafeAreaView} from "react-native";
import TextFields from "@/component/ui/TextFields";

export default function Index() {
  return (
   <SafeAreaView style={{ flex: 1, backgroundColor: '#FDE2E4' }}> 
      <TextFields />
    </SafeAreaView>
  );
}
