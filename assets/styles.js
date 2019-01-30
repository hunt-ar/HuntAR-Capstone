import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    padding: 20,
  },
  largeText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  medText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clueContainer: {
    display: 'flex',
    backgroundColor: 'orange',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    padding: 50,
  },
  headerContainer: {
    backgroundColor: 'yellow',
    width: '100%',
    borderRadius: 5,
    padding: 20,
  },
  header: {
    fontSize: 30,
    color: 'black',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  winImage: {
    marginBottom: 30,
    width: 270
  },
  winContainer: {
    display: 'flex',
    backgroundColor: 'goldenrod',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    padding: 50,
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  start: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  greenButtonContainer: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  redButtonContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  startButton: {
    color: 'black'
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1,
    fontSize: 200
  },
  quitButton: {
    bottom: 0,
    left: 0
  },
  solveButton: {
    bottom: 0,
    right: 0
  },
  solveButtonContainer: {
    right: 0
  },
  quitButtonContainer: {
    left: 0
  }
});
