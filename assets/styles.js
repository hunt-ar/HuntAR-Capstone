import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  largeText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  medText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  titleContainer: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  clueContainer: {
    display: 'flex',
    backgroundColor: 'orange',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    padding: 50
  },
  headerContainer: {
    backgroundColor: 'yellow',
    width: '100%',
    borderRadius: 5,
    padding: 20
  },
  header: {
    fontSize: 30,
    color: 'black',
    textAlignVertical: 'center',
    textAlign: 'center'
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
    padding: 50
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
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
    borderRadius: 5
  },
  redButtonContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5
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
  },
  headerText: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: 'bold'
  },
  itemText: {
    fontSize: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
