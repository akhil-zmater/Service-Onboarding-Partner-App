import { LoadingStateType } from "../common/common.types";

export interface ServiceCenterStateTypes {
  activeSCDetails: GetSCDetailsResponse | null;
  scLoadingStates: ScLoadingStates;
  addFollowUpDetails: postScDetailsFollowUp;
  addLoginDetails: postLoginDetailsResponse | null;
}

export interface ScLoadingStates {
  getSCDetailsLoadingState: LoadingStateType;
  postSCDetailsLoadingState: LoadingStateType;
  addVerificationDetailsLoadingState: LoadingStateType;
  addFlexDetailsLoadingState: LoadingStateType;
  addPhotoGrapghyDetailsLoadingState: LoadingStateType;
  postLoginDetailsLoadingState: LoadingStateType;
  addTrainingDetailsLoadingState: LoadingStateType;
  addOnBoardingDetailsLoadingState: LoadingStateType;
}

export interface postLoginByDetailsBody {
  employeeId: string;
  password: string;
  termsAndConditions: boolean;
}

export interface postLoginDetailsResponse {
  status: string;
  message: string;
  userId: string;
  employeeId: string;
  userRole: string;
  name: string;
  emailId: string;
  lastLoginTime: string;
  activeStatus: string;
  transactionId: string;
}

export interface GetSCDetailsByPhoneNoReqBody {
  mobileNumber: string;
}

export interface GetSCDetailsResponse {
  phoneNumber: string;
  serviceCenterOwnerName: string;
  serviceCenterAddress: string;
  serviceCenterName: string;
  salesRepId: string;
  registeredDate: string;
  registrationComments: string;
  registrationStatus: RegistrationStatusEnum;
  subscriptionType: string;
  registrationFollowup?: Followup;
  verificationDetails: VerificationDetails;
  flexDetails: FlexDetails;
  photographyDetails?: PhotographyDetails;
  trainingDetails?: TrainingDetails;
  onBoardingDetails?: OnBoadingDetails;
  latitude: number;
  longitude: number;
}
interface TrainingDetails {
  status: PTOStatusEnum;
  followup: Followup;
}
interface OnBoadingDetails {
  status: PTOStatusEnum;
  followup: Followup;
}
interface FlexDetails {
  repId: string;
  status: FlexInstallationEnum;
  comments: string;
  phoneNumber?: any;
  followup: Followup;
}
interface PhotographyDetails {
  status: PTOStatusEnum;
  followup: Followup;
  phDate?: string;
}

interface Followup {
  reason: string;
  followUpDate: string;
}

interface VerificationDetails {
  verifierName: string;
  verifierRepId: string;
  verificationStatus: VerificationStatusEnum;
  flexInstallationDate: string;
  flexDimensions: string;
  comments: string;
  phoneNumber?: any;
  followup: Followup;
}

export enum RegistrationStatusEnum {
  REGISTERED = "Registered",
  FOLLOWUP = "Followup",
  REJECT = "Reject",
}
export enum FlexInstallationEnum {
  FLEX_INSTALLATION_COMPLETE = "FlexInstallationcomplete",
  FLEX_INSTALLATION_PENDING = "flexInstallationPending",
}
export enum VerificationStatusEnum {
  VERIFIED = "Verified",
  VERIFICATION_PENDING = "VerificationPending",
  REJECTED = "Rejected",
}
export enum PTOStatusEnum {
  COMPLETE = "complete",
  PENDING = "pending",
}

export enum BtnTypes {
  REGISTRATION = "Registration",
  VERIFICATION = "Verification",
  FLEX_INSTALLATION = "Flex Installation",
  PHOTOGRAPHY = "Photography",
  TRAINING = "Training",
  ONBOARDING = "Onboarding",
}
export enum StatusTypeEnum {
  COMPLETED = "Completed",
  PENDING = "Pending",
  REJECTED = "Rejected",
  NOT_STARTED = "Not Started",
}

export interface postSCDetailsReqBody {
  salesRepId: string;
  comments?: string;
  registrationStatus: string;
  subscriptionType: string;
}
export interface postSCDetailsPayload {
  phoneNumber: string;
  serviceCenterOwnerName: string;
  serviceCenterAddress: string;
  serviceCenterName: string;
  salesRepId: string;
  registeredDate?: string;
  comments: string;
  registrationStatus: string;
  followup: postScDetailsFollowUp;
  subscriptionType: string;
}
export interface postScDetailsFollowUp {
  reason?: string;
  followUpDate: string;
}

export interface AddVerificationDetailsPayload {
  verifierName: string;
  verifierRepId: string;
  verificationStatus: string;
  flexInstallationDate?: string;
  flexDimensions?: string;
  comments: string;
  isFollowUpClicked?: boolean;
}

export interface AddVerificationDetailsReqBody
  extends AddVerificationDetailsPayload {
  phoneNumber: string;
  followup?: postScDetailsFollowUp | null;
}

export interface AddFlexDetailsPayload {
  repId: string;
  status: string;
  comments: string;
  phDate?: string;
  isFollowUpClicked?: boolean;
}

export interface AddFlexDetailsReqBody extends AddFlexDetailsPayload {
  phoneNumber: string;
  followup?: postScDetailsFollowUp | null;
}

export interface AddPhotoGraphyDetalsPayload {
  repId: string;
  status: string;
  comments: string;
  isFollowUpClicked?: boolean;
  phDate?: string;
}
export interface AddPhotoGraphyDetalsreqBody
  extends AddPhotoGraphyDetalsPayload {
  phoneNumber: string;
  followup?: postScDetailsFollowUp | null;
}

export interface AddTrainingDetailsPayload {
  repId: string;
  status: string;
  comments: string;
  isFollowUpClicked?: boolean;
}
export interface AddTrainingDetailsReqBody extends AddTrainingDetailsPayload {
  phoneNumber: string;
  followup: postScDetailsFollowUp | null;
}

export interface AddOnboadingDetailsPayload {
  repId: string;
  status: string;
  comments: string;
  isFollowUpClicked?: boolean;
}
export interface AddOnboadingDetailsReqBody extends AddOnboadingDetailsPayload {
  phoneNumber: string;
  followup: postScDetailsFollowUp | null;
}
export enum SubscriptionTypeEnum {
  PAID = "Paid",
  UNPAID = "Unpaid",
}
