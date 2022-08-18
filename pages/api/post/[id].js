import { firestore } from "Firebase/admin"

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
    const { query } = req
    const { id } = query

    firestore
        .collection("coleccion")
        .doc(id)
        .get()
        .then((doc) => doc.data())
        .then((data) => res.json(data))
        .catch(() => res.status(404).end())
}
