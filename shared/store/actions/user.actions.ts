export const setUserNameType = '[USER] Set user name';
export const setPhotoUrlType = '[USER] Set photo url';

export const setUserName = (name: string) => ({
    type: setUserNameType,
    name
});

export const setPhotoUrl = (photoUrl: string) => ({
    type: setPhotoUrlType,
    photoUrl
});