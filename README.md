# swr-sync-native-storage

Synchronize SWR cache with AsyncStorage to get offline cache.

## Usage

Installation:

package:
`yarn add swr-sync-storage`

peer Dependencies:
`yarn add swr @react-native-async-storage/async-storage`

```javascript
import React, { useState } from 'react';
import { syncWithAsyncStorage } from 'swr-sync-native-storage';

const App = () => {
  const [isSynced, setIsSynced] = useState(null);
  useEffect(() => {
    (async () => {
      const [isSuccess, unsubscribe] = await syncWithAsyncStorage();
      setIsSynced(isSuccess);
    })();
  }, [setIsSynced]);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>
        {isSynced === null ? 'Loading...' : isSynced ? 'Success' : 'Failed'}
      </Text>
    </View>
  );
};
```

The function will return a success flag & a new function to unsubscribe for cache changes.
