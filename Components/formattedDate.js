const formattedDate = () => {
    const date = new Date();
    const day = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
    const month = `${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth()}`;
    const year = `${date.getFullYear()} `;
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const seconds = date.getSeconds();
    const formattedDate =
        day +
        "/" +
        month +
        "/" +
        year +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        seconds;
    const formatDate = day + "/" + month + "/" + year;

    return formatDate;
};
export default formattedDate;

// export const formattedDateWithSeconds = () => {
// 	const date = new Date();
// 	const day = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
// 	const month = `${
// 		 date.getMonth() + 1 < 10 ? "0" : ""
// 	}${date.getMonth()}`;
// 	const year = `${date.getFullYear()} `;
// 	const minutes = date.getMinutes()
// 	const hour = date.getHours()
// 	const seconds = date.getSeconds()
// 	const formattedDate = day + "/" + month + "/" + year + ' ' + hour+":"+minutes+":"+seconds;
// 	const formatDate = day + "/" + month + "/" + year ;

// 	return formattedDate
// }
