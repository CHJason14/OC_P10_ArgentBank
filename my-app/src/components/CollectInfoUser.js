import { useDispatch } from "react-redux";

export default function CollectInfoUser() {
    const storageToken = sessionStorage.getItem("tokens");
    const dispatch = useDispatch();
  
    fetch('http://localhost:3001/api/v1/user/profile', {
      headers: {
        "Authorization": 'Bearer ' + storageToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3001/",
      },
      mode: "cors",
      method: "POST",
    })
    .then((res) => res.json())
    .then((infoClient) => {
      dispatch({
        type: 'infoUser/changeName',
        payload: {firstName: infoClient.body.firstName, lastName: infoClient.body.lastName, userName: infoClient.body.userName},
      });
        })
    .catch((err) => console.log(err));
}