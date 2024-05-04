import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5,
    },
    subtletitle: {
      fontSize: 16,
      marginTop: 10,
      marginBottom: 5,
    },
    error: {
      color: 'red',
    },
    background: {
      backgroundColor: '#cfe6e8',
    },
    landingPageBackground: {
      backgroundColor: '#d1e3d9',
    },
});

export const weatherStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  centeredContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#228B22',
      marginBottom: 20,
  },
  input: {
      height: 40,
      width: '80%',
      borderColor: '#228B22',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      color: '#228B22',
  },
  button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#228B22',
      padding: 10,
      borderRadius: 5,
  },
  buttonText: {
      color: 'white',
      margin:5,
  },
  weatherInfo: {
      marginTop: 20,
      alignItems: 'center',
  },
  heading: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#228B22',
      marginTop: 10,
  },
  subheading: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#228B22',
      marginTop: 10,
  },
  weatherText: {
      color: '#228B22',
      fontSize: 16,
      marginBottom: 8,
  },
});

export const tripStyles =  StyleSheet.create({
  viewMapButton: {
    position: 'absolute',
    top: 10,
    right: '24%',
    backgroundColor: 'green',
    borderRadius: 5,
  },
  modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 50,
      padding: 20, 
  },
  modalHeaderText: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  dismissButton: {
      color: 'blue',
      fontSize: 16,
  },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
      width: '80%',
  },
  input: {
      height: 40,
      width: '100%',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
  },
  buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  actionButton: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
  },
  cancelButton: {
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
  },
  buttonText: {
      color: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: '24%',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  tripItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  }
});

export const locationStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      marginTop:25,
    },
    rating: {
      fontSize: 16,
      marginBottom: 15,
    },
    address: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 10,
    },
    info: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 5,
    },
    link: {
      fontSize: 16,
      color: 'blue',
      textDecorationLine: 'underline',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: 'center',
    },
    openingHours: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 5,
    },
    image: {
      width: 200,
      height: 200,
    },
    addButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'blue',
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    addButtonLabel: {
      color: 'white',
      fontSize: 16,
    },
});

export const mapStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#d1e3d9'
    },
    map: {
      flex: 1,
    },
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginTop:30,
    },
    errorContainer: {
      alignItems: 'center',
      paddingVertical: 10,
    },
    errorMessage: {
      color: 'red',
      fontSize: 16,
    },
    input: {
      flex: 1,
      borderRadius: 10,
      margin: 10,
      color: '#000',
      borderColor: '#666',
      backgroundColor: '#FFF',
      borderWidth: 1,
      height: 45,
      paddingHorizontal: 10,
      fontSize: 18, 
    },
    resultContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#DDD',
    },
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginTop:30,
    },
    calloutContainer: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop:5,
      marginBottom: 5,
    },
    address: {
      fontSize: 12,
    }
});

export const destinationStyles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    destinationContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    destinationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    destinationItem: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '45%',
      margin: 10,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      overflow: 'hidden', 
    },
    image: {
      width: '90%',
      height: 100,
      margin: 10,
      borderRadius: 10,
    },
    destinationTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      margin:10,
    },
  });

export const accountStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    buttonContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    buttonWrapper: {
      width: '100%',
      padding: 20,
      borderRadius: 10, // rounded edges
    },
    bgGreen: {
      backgroundColor: '#28a745',
    },
    bgBlue: {
      backgroundColor: '#007bff',
    }
  });