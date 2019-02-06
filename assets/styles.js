import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#004466'
  },
  storyParentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent'
  },
  largeText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  HomeHeader: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: '15%',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 30
  },
  HomeImage: {
    marginTop: '15%'
  },
  HomeButtons: {
    marginTop: '10%'
  },
  HomeButton: {
    marginTop: '5%'
  },
  StoryHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: '15%',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  StoryText: {
    fontSize: 24,
    color: '#ffffff',
    marginTop: '7%'
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    padding: 5
  },
  medText: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    color: '#be3b3b',
    padding: 5
  },
  medium: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 7
  },
  introText: {
    fontSize: 17,
    paddingTop: 5,
    padding: 15
  },
  titleContainer: {
    flex: 2,
    backgroundColor: 'transparent',
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
  userImage: {
    height: 300,
    resizeMode: 'contain'
  },
  userImageTiny: {
    height: 100,
    resizeMode: 'contain'
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
    alignItems: 'center'
  },
  timerStyle: {
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  timeAlmostUpStyle: {
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red'
  }
});
