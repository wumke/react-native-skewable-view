# react-native-skewable-view
A skewable view for react native, works in iOS and Android!

The inner content is vertically scrollable.

## Setup

Fast and easy:
```bash
npm install react-native-skewable-view --save
```

Or manual: add the latest version as dependeny to your package.json.

```javascript
{
  "name": "YourProject",
  ...
  },
  "dependencies": {
    ...
    "react-native-skewable-view": "0.0.1",
    ...
  }
```


## Usage

```javascript
import SkewableView from 'react-native-skewable-view/SkewableView';
...
<SkewableView
    style={{position: 'absolute', top:0, left:0, backgroundColor: '#00ff00'}}
    skewDirection={"vertical-top"}
    skewValue={10}
    skewUnits={"deg"}
    boundingBoxHeight={200}
    boundingBoxWidth={200}
    backgroundColor={"#ff0000"}>
    <Text>
     This text is the inner content of the (vertical scollable) skewable view... feel free to add anything you like!
    </Text>
</SkewableView>
...
```