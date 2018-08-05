export default function email2id (email) {
    return email.replace(/\./g,'%');
};