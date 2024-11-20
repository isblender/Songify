import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#accaa1',
      },
      title: {
        fontSize: 48,
        fontFamily:'roboto',
        fontWeight:'bold',
        marginBottom: '3%',
      },
      button: {
        padding: 10,
        borderWidth: 1,
        width: 200,
        borderColor:'black',
        marginVertical: 10,
      },
      buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
      },
      block: {
        alignItems: 'center', // Center items horizontally
        justifyContent: 'flex-start', // Ensure items are aligned at the start
      },
      buttonContainer: {
        marginTop: 10, 
        height: 100,
        justifyContent: 'center', // Center the buttons (or the empty space)
      },
      input: {
        width: 200, // Adjust the width of the input
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginBottom: 15, // Space between inputs
        backgroundColor: 'rgb(190 223 178)',
        color: 'black',
      },
      overlay: {
        position: 'absolute',
        top: '35%', // Adjust this value to position the login form correctly
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
      },
});
export default styles