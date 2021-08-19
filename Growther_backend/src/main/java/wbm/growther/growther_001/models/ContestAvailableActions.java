package wbm.growther.growther_001.models;

import javax.persistence.*;
import java.util.Set;

//@Entity
public class ContestAvailableActions {

    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String socialMediaName;
    private String actionName;
    private boolean isEnabled;

    //@ManyToMany(mappedBy = "providedActions")
    //private Set<Contest> contestsComposants;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSocialMediaName() {
        return socialMediaName;
    }

    public void setSocialMediaName(String socialMediaName) {
        this.socialMediaName = socialMediaName;
    }

    public String getActionName() {
        return actionName;
    }

    public void setActionName(String actionName) {
        this.actionName = actionName;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

}
