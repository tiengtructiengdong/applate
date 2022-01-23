export const post = (req, onSuccess, onFail) =>
  fetch(req.service, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
    param: JSON.stringify(req.param),
  })
    .then(response => {
      response
        .json()
        .then(data => {
          if (response.status === 200) {
            onSuccess(data);
          } else {
            onFail(data);
          }
        })
        .catch(err => {
          Alert.alert('Error');
        });
    })
    .catch(err => {
      Alert.alert('Error', string(err));
    });

export const get = (req, onSuccess, onFail) =>
  fetch(req.service, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    param: JSON.stringify(req.param),
  })
    .then(response => {
      response
        .json()
        .then(data => {
          if (response.status === 200) {
            onSuccess(data);
          } else {
            onFail(data);
          }
        })
        .catch(err => {
          Alert.alert('Error');
        });
    })
    .catch(err => {
      Alert.alert('Error', string(err));
    });
