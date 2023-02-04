

const defaultOptions = {
	duration:2000,
	showClose:true
};
const MyMessage = (options = {}) => {
	if(typeof options =='string') options={message:options};
	const _options=Object.assign(defaultOptions,options);
	return ElMessage(_options);
	
}
export default MyMessage;
