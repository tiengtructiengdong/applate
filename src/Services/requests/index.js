export const post = (param, onSuccess, onFail) =>
  fetch(param.service, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(param.body),
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

export const get = (param, onSuccess, onFail) =>
  fetch(service, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      number: username,
      password: password,
    }),
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
